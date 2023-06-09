import { Request } from "express";
import ITokensControllerDomain from "../domain/controllers/Tokens";
import TokensService from "../services/Tokens.service";
import jwt from "jsonwebtoken";
import { refreshTokenVerify } from "../util/jwt.util";
import { isJWT } from "class-validator";

class TokensController implements ITokensControllerDomain {
  public tokensService: TokensService;

  constructor() {
    this.tokensService = new TokensService();
  }

  async reissueToken(accessToken: string): Promise<string> {
    if (!isJWT(accessToken)) throw new Error("비정상적인 접근입니다.");

    const tokenData = await this.tokensService.getTokens(accessToken);
    const { userId, refreshToken } = tokenData;

    // refresh 토큰 만료 여부 refresh 토큰도 만료됐으면 로그아웃 처리
    refreshTokenVerify(refreshToken);
    // 새로운 토큰 발급 프로세스
    const newAccessToken = TokensController.generateAccessToken(userId);
    // 새로운 토큰 db에 insert
    await this.deleteToken(accessToken);
    await this.tokensService.storeToken(newAccessToken, refreshToken, userId);
    return newAccessToken;
  }

  async getRefreshToken(accessToken: string): Promise<object> {
    const TokenService = new TokensService();
    const refreshToken = TokenService.getTokens(accessToken);
    return refreshToken;
  }

  async deleteToken(oldAccessToken: string): Promise<boolean> {
    await this.tokensService.deleteToken(oldAccessToken);
    return true;
  }

  static generateAccessToken(userId: string): string {
    return jwt.sign(
      {
        data: userId,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign(
      {
        data: userId,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "15d" }
    );
  }

  async storeToken(
    accessToken: string,
    refreshToken: string,
    userId: string
  ): Promise<boolean> {
    const TokenService = new TokensService();
    await TokenService.storeToken(accessToken, refreshToken, userId);
    return true;
  }
}

export default TokensController;

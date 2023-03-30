import ITokensControllerDomain from "../domain/controllers/Tokens";
import TokensService from "../services/Tokens.service";
import jwt from "jsonwebtoken";

class TokensController implements ITokensControllerDomain {
  public tokensService: TokensService;

  constructor() {
    this.tokensService = new TokensService();
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

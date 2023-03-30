import ITokenServiceDomain from "../domain/services/Tokens";
import Tokens from "../models/Tokens.model";

class TokensService implements ITokenServiceDomain {
  constructor() {}

  async storeToken(
    accessToken: string,
    refreshToken: string,
    userId: string
  ): Promise<boolean> {
    const result = await Tokens.create({
      accessToken,
      refreshToken,
      userId,
    });

    if (result === null) {
      throw new Error("토큰 생성에 실패하였습니다.");
    }

    return true;
  }
}

export default TokensService;
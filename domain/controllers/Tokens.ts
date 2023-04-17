export default interface ITokensControllerDomain {
  reissueToken(accessToken: string): Promise<string>;
  generateAccessToken(userId: string): string;
  getRefreshToken(accessToken: string): Promise<object>;
  storeToken(
    accessToken: string,
    refreshToken: string,
    userId: string
  ): Promise<boolean>;
}

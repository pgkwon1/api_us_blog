export default interface ITokensControllerDomain {
  generateAccessToken(userId: string): string;
  getRefreshToken(accessToken: string): Promise<object>;
  storeToken(
    accessToken: string,
    refreshToken: string,
    userId: string
  ): Promise<boolean>;
}

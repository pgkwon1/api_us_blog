export default interface ITokenServiceDomain {
  getTokens(accessToken: string): Promise<object>;
  storeToken(
    accessToken: string,
    refreshToken: string,
    userId: string
  ): Promise<boolean>;
  deleteToken(oldAccessToken: string): Promise<boolean>;
}

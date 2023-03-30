export default interface ITokenServiceDomain {
  getRefreshToken(accessToken: string): Promise<object>;
  storeToken(
    accessToken: string,
    refreshToken: string,
    userId: string
  ): Promise<boolean>;
}

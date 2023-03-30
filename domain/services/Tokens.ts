export default interface ITokenServiceDomain {
  storeToken(
    accessToken: string,
    refreshToken: string,
    userId: string
  ): Promise<boolean>;
}

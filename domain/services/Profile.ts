export interface IProfileServiceDomain {
  getProfile(userId: string): Promise<object>;
  createEmptyProfile(userId: string): Promise<boolean>;
}

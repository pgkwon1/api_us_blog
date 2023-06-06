export interface IProfileControllerDomain {
  getProfile(userId: string): Promise<object>;
  createEmptyProfile(userId: string): Promise<boolean>;
}

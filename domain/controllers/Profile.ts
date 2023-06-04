export interface IProfileControllerDomain {
  createEmptyProfile(userId: string): Promise<boolean>;
}

export interface IProfileServiceDomain {
  createEmptyProfile(userId: string): Promise<boolean>;
}

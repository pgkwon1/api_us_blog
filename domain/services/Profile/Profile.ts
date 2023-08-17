import { IProfileEditData } from "../../../dto/profile/ProfileDto";
import Profile from "../../../models/Profile/Profile.model";

export interface IProfileServiceDomain {
  getProfile(userId: string): Promise<Profile>;
  getProfileById(id: string): Promise<Profile>;
  createEmptyProfile(userId: string): Promise<boolean>;
  editProfile(info: IProfileEditData): Promise<boolean | Profile>;
}

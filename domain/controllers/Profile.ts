import { IProfileEditData } from "../../dto/profile/ProfileDto";
import Profile from "../../models/Profile/Profile.model";

export interface IProfileControllerDomain {
  createEmptyProfile(userId: string): Promise<boolean>;
  getProfile(userId: string): Promise<Profile>;
  editProfile(info: IProfileEditData): Promise<boolean | Profile>;
  uploadProfilePicture(
    profileId: string,
    fileName: string
  ): Promise<Profile | boolean>;
}

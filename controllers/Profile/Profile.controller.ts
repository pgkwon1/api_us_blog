import { IProfileControllerDomain } from "../../domain/controllers/Profile";
import { IProfileEditData } from "../../dto/profile/ProfileDto";
import Profile from "../../models/Profile/Profile.model";
import ProfileService from "../../services/Profile/Profile.service";

class ProfileController implements IProfileControllerDomain {
  public profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  async createEmptyProfile(userId: string): Promise<boolean> {
    await this.profileService.createEmptyProfile(userId);
    return true;
  }

  async getProfile(userId: string): Promise<Profile> {
    const profile = await this.profileService.getProfile(userId);
    return profile;
  }

  async editProfile(info: IProfileEditData): Promise<boolean | Profile> {
    const result = await this.profileService.editProfile(info);
    return result;
  }

  async uploadProfilePicture(
    profileId: string,
    fileName: string
  ): Promise<Profile | boolean> {
    const result = await this.profileService.editProfile({
      profileId,
      picture: fileName,
      fields: ["picture"],
    });

    return result;
  }
}

export default ProfileController;

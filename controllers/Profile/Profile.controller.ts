import { IProfileControllerDomain } from "../../domain/controllers/Profile";
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

  async getProfile(userId: string): Promise<object> {
    const profile = await this.profileService.getProfile(userId);
    return profile;
  }
}

export default ProfileController;

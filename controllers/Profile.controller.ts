import { IProfileControllerDomain } from "../domain/controllers/Profile";
import ProfileService from "../services/Profile.service";

class ProfileController implements IProfileControllerDomain {
  public profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  async createEmptyProfile(userId: string): Promise<boolean> {
    await this.profileService.createEmptyProfile(userId);
    return true;
  }
}

export default ProfileController;

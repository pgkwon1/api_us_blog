/* eslint-disable class-methods-use-this */
import { IProfileServiceDomain } from "../domain/services/Profile";
import Profile from "../models/Profile/Profile.model";

class ProfileService implements IProfileServiceDomain {
  constructor() {}

  async createEmptyProfile(userId: string): Promise<boolean> {
    const result = await Profile.create({
      userId,
    });
    if (result === undefined) {
      throw new Error("프로필 생성에 실패하였습니다.");
    }
    return true;
  }
}
export default ProfileService;

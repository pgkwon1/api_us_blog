/* eslint-disable class-methods-use-this */
import { Sequelize } from "sequelize";
import { IProfileServiceDomain } from "../../domain/services/Profile";
import Profile from "../../models/Profile/Profile.model";
import Skills from "../../models/Profile/Skills.model";

class ProfileService implements IProfileServiceDomain {
  constructor() {}

  async getProfile(userId: string): Promise<object> {
    const result = await Profile.findOne({
      where: {
        userId,
      },
      include: [
        {
          model: Skills,
          through: {
            attributes: ["profileId", "skillsId"],
          },
        },
      ],
      order: [[Sequelize.literal("Skills.order"), "ASC"]],
    });

    if (result === null) {
      throw new Error("프로필이 존재하지 않습니다.");
    }
    return result;
  }

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

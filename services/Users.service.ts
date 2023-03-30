import { IUserServiceDomain } from "../domain/services/Users";
import RegisterDto from "../dto/member/RegisterDto";
import Users from "../models/Users.model";

class UsersService implements IUserServiceDomain {
  constructor() {}

  async getUser(userId: string, password?: string): Promise<object> {
    const where = password ? { userId, password } : { userId };
    const userInfo = await Users.findOne({
      where,
    });

    if (userInfo === null) {
      throw new Error("회원정보가 없습니다.");
    }

    return userInfo;
  }

  async register(registerData: RegisterDto): Promise<boolean> {
    const { userId, password, nickname, salt } = registerData;
    await Users.create({
      userId,
      password,
      nickname,
      salt,
    });
    return true;
  }

  async isUser(userId: string): Promise<boolean> {
    const userInfo = await Users.findOne({
      where: {
        userId,
      },
    });
    if (userInfo !== null) {
      return true;
    }
    return false;
  }
}
export default UsersService;

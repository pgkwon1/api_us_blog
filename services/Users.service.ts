import RegisterDto from "../dto/member/RegisterDto";
import Users from "../models/Users.model";

class UsersService {
  constructor() {}

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

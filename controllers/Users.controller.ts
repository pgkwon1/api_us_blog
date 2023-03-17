import RegisterDto from "../dto/member/RegisterDto";
import UsersService from "../services/Users.service";
import UtilService from "../services/Util.service";

interface IUserDomain {
  //getUser(): Promise<object>;
  //login(): Promise<object>;
  register(registerData: RegisterDto): Promise<void>;
}
class UserController implements IUserDomain {
  public userService: UsersService;

  constructor() {
    this.userService = new UsersService();
  }

  // async getUser(): Promise<object> {}

  //async login(): Promise<object> {}

  async register(registerData: RegisterDto): Promise<void> {
    const { userId, password, nickname } = registerData;
    const isUser: boolean = await this.userService.isUser(userId);
    if (isUser === true) {
      throw new Error("이미 가입된 회원입니다.");
    }

    const salt = UtilService.createSalt();
    const encryptPassword = UtilService.encryptPassword(password, salt);

    await this.userService.register({
      userId,
      password: encryptPassword,
      nickname,
      salt,
    });
  }
}
export default UserController;

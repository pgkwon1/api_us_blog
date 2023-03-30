import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { IUsersControllerDomain } from "../domain/controllers/Users";
import ILoginDto from "../dto/member/LoginDto";
import RegisterDto from "../dto/member/RegisterDto";
import UsersService from "../services/Users.service";
import UtilService from "../services/Util.service";
import TokensController from "./Tokens.controller";

dotenv.config();

class UserController implements IUsersControllerDomain {
  public userService: UsersService;

  public tokensController: TokensController;

  constructor() {
    this.userService = new UsersService();
    this.tokensController = new TokensController();
  }

  async login(loginData: ILoginDto): Promise<any> {
    const { userId, password } = loginData;

    const userInfo = await this.userService.getUser(userId);
    const encryptPassword = UtilService.encryptPassword(
      password,
      userInfo.salt
    );

    if (encryptPassword !== userInfo.password) {
      throw new Error("회원정보가 없습니다.");
    }

    const accessToken = TokensController.generateAccessToken(userId);
    const refreshToken = TokensController.generateRefreshToken(userId);
    await this.tokensController.storeToken(accessToken, refreshToken, userId);
    return accessToken;
  }

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

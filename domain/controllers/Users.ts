import ILoginDto from "../../dto/member/LoginDto";

export interface IUsersControllerDomain {
  //getUser(): Promise<object>;
  login(loginData: ILoginDto): Promise<any>;
  register(registerData: RegisterDto): Promise<void>;
}

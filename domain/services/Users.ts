import RegisterDto from "../../dto/member/RegisterDto";

export interface IUserServiceDomain {
  getUser(userId: string, password?: string): Promise<object>;
  register(registerData: RegisterDto): Promise<boolean>;
  isUser(userId: string): Promise<boolean>;
}

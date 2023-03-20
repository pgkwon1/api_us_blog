import RegisterDto from "../../dto/member/RegisterDto";

export interface IUserServiceDomain {
  register(registerData: RegisterDto): Promise<boolean>;
  isUser(userId: string): Promise<boolean>;
}

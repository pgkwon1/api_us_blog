interface IUsersControllerDomain {
  //getUser(): Promise<object>;
  //login(): Promise<object>;
  register(registerData: RegisterDto): Promise<void>;
}

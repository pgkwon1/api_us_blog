import { validateOrReject } from "class-validator";
import RegisterDto from "../dto/member/RegisterDto";
import LoginDto from "../dto/member/LoginDto";

interface IErrorList {
  property: string;
  value: undefined | string;
}
export default class UserMiddleWare {
  constructor() {}

  static async validateRegisterBody(body: RegisterDto): Promise<boolean> {
    const register = new RegisterDto();
    register.userId = body.userId;
    register.password = body.password;
    register.nickname = body.nickname;
    await validateOrReject(register).catch((errList) => {
      let errorMsg = "";
      errorMsg = this.createValidateErrorMessage(errList);
      throw new Error(errorMsg);
    });
    return true;
  }

  static async validateLoginBody(body: LoginDto): Promise<boolean> {
    const login = new LoginDto();
    login.userId = body.userId;
    login.password = body.password;
    await validateOrReject(login).catch((errList) => {
      let errorMsg = "";
      errorMsg = this.createValidateErrorMessage(errList);
      throw new Error(errorMsg);
    });
    return true;
  }

  static createValidateErrorMessage(errList: Array<IErrorList>) {
    let errorMsg;
    errList.map((err, index) => {
      errorMsg += `${err.property} 를(을) `;
      err.value === undefined
        ? (errorMsg += "입력해주세요")
        : (errorMsg += "다시 입력해주세요");

      errList.length !== index + 1 ? (errorMsg += ",") : "";
    });
    errorMsg = errorMsg.replace("undefined", "");
    return errorMsg;
  }
}

import crypto from "crypto";
class UtilService {
  constructor() {}

  static createSalt(): string {
    return crypto.randomBytes(64).toString("hex");
  }

  static encryptPassword(password: string, salt: string): string {
    const key = crypto.pbkdf2Sync(password, salt, 999, 64, "sha512");
    return key.toString("hex");
  }
}

export default UtilService;

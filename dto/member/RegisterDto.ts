import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class RegisterDto {
  @IsNotEmpty()
  @IsString()
  public userId: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public nickname: string;

  @IsOptional()
  public salt: string;
}

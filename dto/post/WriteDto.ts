import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { IsArray } from "sequelize-typescript";

export default class IWriteDto {
  @IsString({
    message: "비정상적인 접근입니다.",
  })
  @IsNotEmpty({
    message: "비정상적인 접근입니다.",
  })
  public author: string;

  @IsString({
    message: "제목을 다시 입력해주세요",
  })
  @IsNotEmpty({
    message: "제목을 입력해주세요",
  })
  public title: string;

  @IsNotEmpty({
    message: "내용을 입력해주세요",
  })
  public contents: string;

  @IsOptional()
  public tags: string[];

  @IsIn(["기술", "직장", "잡담"])
  public category: string;
}

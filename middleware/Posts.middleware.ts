import { validateOrReject } from "class-validator";
import IWriteDto from "../dto/post/WriteDto";

export default class PostMiddleware {
  static async validateWriteBody(body: IWriteDto) {
    const { author, title, contents, tags, category } = body;
    const writeDto = new IWriteDto();
    writeDto.author = author;
    writeDto.title = title;
    writeDto.contents = contents;
    writeDto.tags = tags;
    writeDto.category = category;
    await validateOrReject(writeDto).catch(() => {
      throw new Error("글 작성에 실패하였습니다.");
    });
  }
}

import { isJWT } from "class-validator";
import { Request } from "express";
import jwt from "jsonwebtoken";

export function accessTokenVerify(req: Request): boolean {
  const token =
    req.headers.authorization &&
    req.headers.authorization.replace("Bearer ", "");

  if (!isJWT(token)) throw new Error("비정상적인 접근입니다.");
  if (token && token !== "undefined") {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err: Error) => {
      if (err && err !== null) {
        throw new Error("access token expired");
      }
    });
  }
  return true;
}

export function refreshTokenVerify(refreshToken: string): boolean {
  if (!isJWT(refreshToken)) throw new Error("비정상적인 접근입니다.");
  if (refreshToken && refreshToken !== "undefined") {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (err: Error) => {
        if (err && err !== null) {
          throw new Error("refresh token expired");
        }
      }
    );
  }
  return true;
}

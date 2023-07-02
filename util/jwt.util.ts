import { isJWT } from "class-validator";
import { Request } from "express";
import jwt from "jsonwebtoken";

export function accessTokenVerify(req: Request): boolean {
  const token =
    req.headers.authorization &&
    req.headers.authorization.replace("Bearer ", "");
  if (token && token !== "undefined") {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err: Error) => {
      if (err && err !== null) {
        if (err.message === "jwt expired") {
          throw new Error("access token expired");
        } else {
          throw new Error("Some Token Error");
        }
      }
    });
  } else {
    const { method, url } = req;
    method === "POST" && url === "/member/login"
      ? ""
      : throw new Error("비정상적인 접근입니다.");
  }
  return true;
}

export function refreshTokenVerify(refreshToken: string): boolean {
  if (refreshToken && refreshToken !== "undefined") {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (err: Error) => {
        if (err && err !== null) {
          if (err.message === "jwt expired") {
            throw new Error("refresh token expired");
          } else {
            throw new Error("Some Token Error");
          }
        }
      }
    );
  }
  return true;
}

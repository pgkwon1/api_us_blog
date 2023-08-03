import { isJWT } from "class-validator";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const excludeUrl = ["/member/login", "/member/register", "/retoken"];

export function accessTokenVerify(req: Request): boolean {
  if (excludeUrl.includes(req.url)) return true;
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
    throw new Error("비정상적인 접근입니다.");
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

export const checkUserPutPatchDelete = (req: Request) => {
  const token =
    req.headers.authorization &&
    req.headers.authorization.replace("Bearer ", "");
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    (err: Error, decode) => {
      if (err && err !== null) {
        const { message } = err;
        if (message === "jwt expired") {
          throw new Error("access token expired");
        }
      } else {
        const isNotOwner = req.body.userId !== decode.data;
        if (isNotOwner) {
          throw new Error("비정상적인 접근입니다.");
        }
      }
    }
  );
};

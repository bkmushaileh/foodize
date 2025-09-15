import { NextFunction } from "express";

export const invaldCredentialsErrorHandler = (
  message = "Invalid Credentials!🙅🏽‍♀️"
) => {
  return { status: 401, message };
};

export const usersNotFound = (message = "Users Not Found") => {
  return { status: 404, message };
};

import { NextFunction, Request, Response } from "express";
import User from "../../Models/User";
import { usersNotFound } from "../../Middleware/errors";
import { serverError } from "../../Middleware/serverError";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find();
  try {
    if (!users || users.length === 0) {
      return next(usersNotFound);
    }
    return res.json(users);
  } catch (error) {
    console.log(error);
    return next(serverError);
  }
};

export const getUserByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id)
      .select("-password -__v")
      .populate({
        path: "recipes",
        select: "name image time difficulty categories",
        populate: { path: "categories", select: "name" },
      });

    if (!user) {
      return next({ status: 404, message: "User Not Found!" });
    }
    return res.json(user);
  } catch (error) {
    console.log(error);
    return next(serverError);
  }
};

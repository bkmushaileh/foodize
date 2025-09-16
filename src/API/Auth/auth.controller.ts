import { NextFunction, Request, Response } from "express";
import { generateHashPassword } from "../../Utils/hashPassword";
import { generatetoken } from "../../Utils/jwt";
import { serverError } from "../../Middleware/serverError";
import validator from "validator";
import bcrypt from "bcrypt";
import User from "../../Models/User";
import { invaldCredentialsErrorHandler } from "../../Middleware/errors";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const image = req.file ? req.file.path : null;

    if (!password || !username || !image || !email) {
      return next(
        invaldCredentialsErrorHandler(
          "Username, image, email and password are required!"
        )
      );
    }
    if (!validator.isEmail(email)) {
      return next(invaldCredentialsErrorHandler("Invalid email format"));
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return next({ message: "Email already exists!", status: 400 });
    }
    const hashedPassword = await generateHashPassword(password);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      image: image,
    });
    const token = generatetoken(newUser, email);

    return res.status(201).json({ token });
  } catch (error) {
    console.log("this is my SIGNUP error", error);
    return next(serverError);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        invaldCredentialsErrorHandler("Email and password are required")
      );
    }

    const emailFound = await User.findOne({ email });
    if (!emailFound) {
      return next(invaldCredentialsErrorHandler());
    }
    const isMatch = await bcrypt.compare(password, emailFound.password!);
    if (!isMatch) {
      return next(invaldCredentialsErrorHandler());
    }
    const token = generatetoken(emailFound._id, email);
    return res.status(200).json({ token });
  } catch (err) {
    return next(serverError);
  }
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  console.log("Token = ", token);

  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
      id: string;
    };
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Invalid token");
    res.status(400).json("Invalid token");
  }
};

export default authMiddleware;

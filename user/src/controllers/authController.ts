import * as amqp from "amqplib/callback_api";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import {
  findUserByEmail,
  findUserByEmailAndOmitPasswordAndRefreshToken,
  findUserById,
} from "../utils/db";
import {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
} from "../utils/generateTokens";
import { sendMail } from "../utils/mail";

const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: "Missing required fields", error: "Bad Request" });
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists", error: "Bad Request" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { email, password: hashedPassword, fullName } });

  const createdUser = await findUserByEmailAndOmitPasswordAndRefreshToken(email);

  const verificationToken: string = await generateVerificationToken(createdUser?.id!);

  await sendMail(email, verificationToken);

  res.status(201).json(
    new ApiResponse(201, {
      verificationUrl: `${process.env.PUBLIC_URL!}/api/users/verify/${verificationToken}`,
      createdUser: createdUser,
    })
  );
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields", error: "Bad Request" });
  }

  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    return res.status(404).json({ message: "User not found", error: "Not Found" });
  }

  if (!existingUser.isVerified) {
    return res.status(400).json({ message: "User not verified", error: "Bad Request" });
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials", error: "Unauthorized}" });
  }

  const accessToken = await generateAccessToken(
    existingUser.id,
    existingUser.email,
    existingUser.fullName
  );

  const refreshToken = await generateRefreshToken(existingUser.id);

  const signedInUser = await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      refreshToken,
    },
  });

  amqp.connect("amqp://rabbitmq", (err, conn) => {
    conn.createChannel((err, ch) => {
      const msg = JSON.stringify(signedInUser);

      ch.assertQueue("user_sign_in");
      ch.sendToQueue("user_sign_in", Buffer.from(msg));
      console.log(" [x] Sent %s", msg);

      if (err) {
        console.log(err);
      }
    });
  });

  res.status(200).json(
    new ApiResponse(200, {
      accessToken,
      refreshToken,
    })
  );
});

const verifyUserFromEmail = asyncHandler(async (req: Request, res: Response) => {
  const token = req.params.token;

  const decoded = (await jwt.verify(token, process.env.VERIFICATION_TOKEN_KEY!)) as { id: string };
  const id = decoded.id;

  const user = await findUserById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.isVerified) return res.status(400).json({ message: "User already verified" });

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      isVerified: true,
    },
  });

  amqp.connect("amqp://rabbitmq", (err, conn) => {
    conn.createChannel((err, ch) => {
      const msg = JSON.stringify(user);

      ch.assertQueue("user_edded");
      ch.sendToQueue("user_added", Buffer.from(msg));
      console.log(" [x] Sent %s", msg);

      if (err) {
        console.log(err);
      }
    });
  });

  res.status(200).json(new ApiResponse(200, { message: "User verified" }));
});

const getUserDetails = asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  const decoded = (await jwt.verify(token!, process.env.ACCESS_TOKEN_KEY!)) as { id: string };

  const user = await findUserById(decoded.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(new ApiResponse(200, user));
});

const signoutUser = asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  const decoded = (await jwt.verify(token!, process.env.ACCESS_TOKEN_KEY!)) as { id: string };

  const user = await findUserById(decoded.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshToken: "",
    },
  });

  res.status(200).json(new ApiResponse(200, { message: "User signed out" }));
});

export { getUserDetails, loginUser, signoutUser, signupUser, verifyUserFromEmail };

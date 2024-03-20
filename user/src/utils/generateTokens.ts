import jwt from "jsonwebtoken";

export const generateAccessToken = async (id: string, email: string, fullName: string) => {
  return await jwt.sign({ id, email, fullName }, process.env.ACCESS_TOKEN_KEY!, {
    expiresIn: "15d",
  });
};

export const generateRefreshToken = async (id: string) => {
  return await jwt.sign({ id }, process.env.REFRESH_TOKEN_KEY!, { expiresIn: "15d" });
};

export const generateVerificationToken = async (id: string) => {
  return await jwt.sign({ id }, process.env.VERIFICATION_TOKEN_KEY!, { expiresIn: "1d" });
};

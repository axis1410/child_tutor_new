import prisma from "../../prisma/prisma";

export const findUserById = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      role: true,
      email: true,
      fullName: true,
      isVerified: true,
      refreshToken: true,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      role: true,
      email: true,
      fullName: true,
      password: true,
      isVerified: true,
      refreshToken: true,
    },
  });
};

export const findUserByEmailAndOmitPasswordAndRefreshToken = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      role: true,
      email: true,
      fullName: true,
      isVerified: true,
    },
  });
};

export const createUser = async (email: string, password: string, fullName: string) => {
  return await prisma.user.create({
    data: {
      email,
      fullName,
      password,
    },
  });
};

export const updateUserVerificationStatus = async (id: string) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      isVerified: true,
    },
  });
};

export const updateRefershToken = async (email: string, refreshToken: string) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      refreshToken,
    },
  });
};

export const returnVerifiedUser = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      email: true,
      role: true,
      id: true,
    },
  });
};

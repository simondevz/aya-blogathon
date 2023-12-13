import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(image: any) {
  const result = await cloudinary.uploader.unsigned_upload(
    image,
    "aya_blogathon"
  );

  const newImage = await prisma.image.create({
    data: { url: result.url, public_id: result.public_id },
  });
  return newImage;
}

// create a function for deleting images
export async function deleteImage(id: number) {
  try {
    const image = await prisma.image.findUnique({ where: { id } });
    await cloudinary.uploader.destroy(image?.public_id as string, {
      invalidate: true,
    });
    await prisma.image.delete({ where: { id } });
  } catch (error) {
    console.log("rigth here");
    console.log(error);
  }
}

export function validatePassword(password: string) {
  // At least 8 characters long
  const hasMinimumLength = password.length >= 8;

  // Contains at least one uppercase letter
  const hasUppercase = /[A-Z]/.test(password);

  // Contains at least one lowercase letter
  const hasLowercase = /[a-z]/.test(password);

  // Contains at least one digit
  const hasDigit = /\d/.test(password);

  // Contains at least one special character
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  // Check if all conditions are met
  const isPasswordValid =
    hasMinimumLength &&
    hasUppercase &&
    hasLowercase &&
    hasDigit &&
    hasSpecialChar;

  return isPasswordValid;
}

export function hashPassword(password: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

export function verifyPassword(providedPassword: string, storedHash: string) {
  const hashedProvidedPassword = hashPassword(providedPassword);
  return hashedProvidedPassword === storedHash;
}

export function authenticateUser() {
  const token = headers().get("authorization")?.split(" ")[1];
  if (!token) return false;
  try {
    return jwt.verify(token, process.env.SECRET_KEY as string);
  } catch (error) {
    console.log(error);
    return false;
  }
}

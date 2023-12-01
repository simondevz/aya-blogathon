import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

export const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: "YipO5_uZZSLqTUvSA6",
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
  const image = await prisma.image.findUnique({ where: { id } });
  await cloudinary.uploader.destroy(image?.public_id as string, {
    invalidate: true,
  });
  await prisma.image.delete({ where: { id } });
}

export function validateEmail(email: string) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

export function authenticateUser(request: any) {
  const authHeader = request.headers.authorization;
  console.log(authHeader);
  return false;
}

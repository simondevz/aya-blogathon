import { CreateUser } from "@/app/types/auth.types";
import jwt from "jsonwebtoken";
import {
  hashPassword,
  prisma,
  validateEmail,
  validatePassword,
} from "../../utils";

export async function POST(request: any) {
  try {
    const { username, firstname, lastname, email, password, role }: CreateUser =
      request.body;

    // Validate data
    if (!validateEmail(email))
      return Response.json({ message: "invalid email", status: 400 });
    if (!validatePassword(password))
      return Response.json({
        message:
          "Password must contain at least one special character, one digit, one lowercase letter, one uppercase letter and be at least 8 characters long",
        status: 400,
      });
    if (!username)
      return Response.json({
        message: "Please ensure to add your username",
        status: 400,
      });

    // check that username and password are unique
    let check;
    check = await prisma.user.findUnique({ where: { username } });
    if (check)
      return Response.json({
        message: "User with Username already exists",
        status: 403,
      });

    check = await prisma.user.findUnique({ where: { email } });
    if (check)
      return Response.json({
        message: "User Email already exists",
        status: 403,
      });

    // hash password and create new user
    const hashed_password = hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        hashed_password,
        email,
        first_name: firstname,
        last_name: lastname,
        role: role === "author" ? role : "reader",
      },
    });

    // create jwt token
    const token = jwt.sign(
      { username, email, role: newUser.role, id: newUser.id },
      "your_secret_key",
      { expiresIn: "7d" }
    );

    // disconnect and return
    await prisma.$disconnect();
    return Response.json({ Access_token: token }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return Response.json({
      message: error?.message || "server error",
      status: 500,
    });
  }
}

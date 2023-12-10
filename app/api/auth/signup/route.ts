import { CreateUser } from "@/app/types/auth.types";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator";
import { hashPassword, prisma, validatePassword } from "../../utils";

export async function POST(request: any) {
  try {
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      as_writer,
    }: CreateUser = await request.json();
    const role = as_writer ? "author" : "reader";

    // Validate data
    if (!EmailValidator.validate(email))
      return Response.json({ message: "invalid email" }, { status: 400 });
    if (!validatePassword(password))
      return Response.json(
        {
          message:
            "Password must contain at least one special character, one digit, one lowercase letter, one uppercase letter and be at least 8 characters long",
        },
        { status: 400 }
      );
    if (!username)
      return Response.json(
        {
          message: "Please ensure to add your username",
        },
        { status: 400 }
      );

    // check that username and password are unique
    let check;
    check = await prisma.user.findUnique({ where: { username } });
    console.log(check);
    if (check?.id)
      return Response.json(
        {
          message: "User with Username already exists",
        },
        { status: 403 }
      );

    check = await prisma.user.findUnique({ where: { email } });
    console.log(check);
    if (check?.id)
      return Response.json(
        {
          message: "User Email already exists",
        },
        { status: 403 }
      );

    console.log(role);
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
      process.env.SECRET_KEY as string,
      { expiresIn: "7d" }
    );

    // disconnect and return
    await prisma.$disconnect();
    return Response.json({ Access_token: token }, { status: 201 }); // you should probably also send in the expiring date
  } catch (error: any) {
    console.log(error);
    await prisma.$disconnect();
    return Response.json(
      {
        message: error?.message || "server error",
      },
      { status: 500 }
    );
  }
}

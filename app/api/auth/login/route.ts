import { CreateUser } from "@/app/types/auth.types";
import jwt from "jsonwebtoken";
import { hashPassword, prisma } from "../../utils";

export async function POST(request: any) {
  try {
    const { username, email, password }: CreateUser = await request.json();

    // validate input
    if (!(username || email))
      return Response.json({
        message: "Please ensure to pass in your email or username",
        status: 400,
      });

    //   get user
    let user;
    if (username) user = await prisma.user.findUnique({ where: { username } });
    if (email) user = await prisma.user.findUnique({ where: { email } });

    // check that a user was found
    if (!user)
      return Response.json({
        message: "No user found with provided username or email",
        status: 400,
      });

    await prisma.$disconnect();

    // verify password and create token
    if (user.hashed_password === hashPassword(password)) {
      const token = jwt.sign(
        { username, email, role: user.role, id: user.id },
        process.env.SECRET_KEY as string,
        { expiresIn: "7d" }
      );
      return Response.json({ Access_token: token }, { status: 200 });
    } else {
      return Response.json({
        message: "Wrong password",
        status: 400,
      });
    }
  } catch (error: any) {
    console.log(error);
    return Response.json({
      message: error?.message || "server error",
      status: 500,
    });
  }
}

import { authenticateUser, prisma } from "../../utils";

export async function GET(request: any) {
  try {
    const { author_id } = request.nextUrl.searchParams;

    // make sure user is authenticated
    const authenticated: any = authenticateUser();
    if (!authenticated || !(author_id === authenticated.id))
      return Response.json({ message: "Unauthorized" }, { status: 403 });

    const author = await prisma.user.findUnique({
      where: { id: author_id },
      include: {
        posts: { include: { keywords: true, image: true } },
        profile_picture: true,
      },
    });

    if (author?.role !== "author") {
      return Response.json(
        { message: "Your not authorizted to access this path" },
        { status: 403 }
      );
    }

    // disconnect and return
    await prisma.$disconnect();
    return Response.json({ author }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Response.json({
      message: error?.message || "server error",
      status: 500,
    });
  }
}

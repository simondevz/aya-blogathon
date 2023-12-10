import { prisma } from "../../utils";

export async function GET(request: any) {
  try {
    const { author_id, keywords } = request.nextUrl.searchParams;
    let posts;

    // get all posts no filters or keywords attached
    if (!(keywords || author_id)) {
      posts = await prisma.post.findMany({
        where: { draft: false },
        include: {
          image: true,
          keywords: {
            select: {
              id: true,
              Keyword: true,
            },
          },
          author: {
            select: {
              id: true,
              username: true,
              first_name: true,
              last_name: true,
              email: true,
            },
          },
        },
      });
    }

    // get posts by an author
    if (author_id && !keywords) {
      posts = await prisma.post.findMany({
        where: { authorId: author_id, draft: false },
        include: { image: true, keywords: true, author: true },
      });
    }

    // by keywords
    if (keywords && !author_id) {
      const keywordsArr = keywords.split(",");
      const postsLink = await prisma.postKeywordLink.findMany({
        where: {
          OR: keywordsArr.map((keyword: string) => ({
            content: {
              contains: keyword,
            },
          })),
        },
        include: {
          post: {
            where: { draft: false },
            include: { image: true, keywords: true, author: true },
          },
        },
      });

      posts = postsLink.map((post) => post.post);
    }

    // by keywords and authors
    if (keywords && author_id) {
      const keywordsArr = keywords.split(",");
      const postsLink = await prisma.postKeywordLink.findMany({
        where: {
          OR: keywordsArr.map((keyword: string) => ({
            content: {
              contains: keyword,
            },
          })),
        },
        include: {
          post: {
            where: { draft: false },
            include: { image: true, keywords: true, author: true },
          },
        },
      });

      posts = postsLink
        .filter((post) => post.post?.authorId === author_id)
        .map((post) => post.post);
    }

    // disconnect and return
    await prisma.$disconnect();
    return Response.json({ posts }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Response.json({
      message: error?.message || "server error",
      status: 500,
    });
  }
}

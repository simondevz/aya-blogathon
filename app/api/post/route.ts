import { authenticateUser, deleteImage, prisma, uploadImage } from "../utils";

export async function GET(request: any) {
  try {
    const post_id = Number(request.nextUrl.searchParams.get("post_id"));
    const isDraft: boolean =
      Boolean(Number(request.nextUrl.searchParams.get("isDraft"))) || false;

    const post = await prisma.post.findUnique({
      where: { id: post_id, draft: isDraft },
      include: {
        keywords: { include: { Keyword: true } },
        author: true,
        image: true,
        md_content: true,
      },
    });

    // disconnect and return
    await prisma.$disconnect();
    return Response.json({ post }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Response.json({
      message: error?.message || "server error",
      status: 500,
    });
  }
}

export async function POST(request: any) {
  try {
    const { author_id, text, title, image, keywords, as_draft } =
      await request.json();

    // make sure user is authenticated
    const authenticated: any = authenticateUser();
    if (!authenticated || !(author_id === authenticated.id))
      return Response.json({ message: "Unauthorized" }, { status: 403 });

    //   validate data passed
    if (!author_id)
      return Response.json({ message: "Path not found" }, { status: 404 });
    if (!text)
      return Response.json(
        { message: "Your post must have content" },
        { status: 400 }
      );
    if (!title)
      return Response.json(
        { message: "Please give your post a Title" },
        { status: 400 }
      );
    if (!keywords.length)
      return Response.json(
        { message: "Your post must have atleast one keyword" },
        { status: 400 }
      );

    // check that the author exists and is authorised to write articles
    const author = await prisma.user.findUnique({ where: { id: author_id } });
    if (!author || !(author.role === "author"))
      return Response.json(
        { message: "This user is not authorized to create Articles" },
        { status: 400 }
      );

    // upload image and add to db
    let imageData;
    if (image) imageData = await uploadImage(image);
    console.log(imageData);

    // create the md_content
    const md_content = await prisma.mdContent.create({
      data: { text: text as string, lastUpdated: new Date() },
    });

    // create post
    const post = await prisma.post.create({
      data: {
        authorId: author_id,
        title: title,
        mdContentId: md_content.id,
        imageId: imageData?.id,
        draft: as_draft === undefined ? false : as_draft,
      },
    });

    // create non existing keywords, get id for those that are there and make a link
    const all_keywords = await prisma.keyword.findMany();
    await Promise.all(
      keywords.map(async (keyword: string) => {
        // check if the keyword existed before
        for (let index = 0; index < all_keywords.length; index++) {
          if (keyword === all_keywords[index].word)
            await prisma.postKeywordLink.create({
              data: { postId: post.id, keywordId: all_keywords[index].id },
            });
        }

        // if it did not return new one
        const newKeyword = await prisma.keyword.create({
          data: { word: keyword },
        });
        await prisma.postKeywordLink.create({
          data: { postId: post.id, keywordId: newKeyword.id },
        });
      })
    );

    // disconnect and return
    await prisma.$disconnect();
    return Response.json({ post }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return Response.json({
      message: error?.message || "server error",
      status: 500,
    });
  }
}

export async function PUT(request: any) {
  try {
    const { post_id, author_id, text, title, image, keywords, as_draft } =
      await request.json();

    // make sure user is authenticated
    const authenticated: any = authenticateUser();
    if (!authenticated || !(author_id === authenticated.id))
      return Response.json({ message: "Unauthorized" }, { status: 403 });

    //   validate data passed
    const post = await prisma.post.findUnique({
      where: { id: Number(post_id) },
    });
    if (!post)
      return Response.json({ message: "Post not found" }, { status: 404 });
    if (!author_id)
      return Response.json({ message: "Path not found" }, { status: 404 });

    if (!text)
      return Response.json(
        { message: "Your post must have content" },
        { status: 400 }
      );
    if (!title)
      return Response.json(
        { message: "Please give your post a Title" },
        { status: 400 }
      );
    if (!keywords.length)
      return Response.json(
        { message: "Your post must have atleast one keyword" },
        { status: 400 }
      );

    //   only author of the post gets to update it
    if (author_id === post?.authorId) {
      // upload new image
      let imageData;
      if (image) imageData = await uploadImage(image);

      // update the md_content
      const md_content = await prisma.mdContent.update({
        where: { id: post.mdContentId },
        data: { text: text as string, lastUpdated: new Date() },
      });

      // create post
      const updatedPost = await prisma.post.update({
        where: { id: Number(post_id) },
        data: {
          authorId: author_id,
          title: title,
          mdContentId: md_content.id,
          [imageData?.id ? "imageId" : ""]: imageData?.id,
          draft: as_draft === undefined ? false : as_draft,
        },
      });

      // delete all the former post keyword links
      await prisma.postKeywordLink.deleteMany({ where: { postId: post?.id } });

      // create non existing keywords, get id for those that are there and make a new link
      const all_keywords = await prisma.keyword.findMany();
      await Promise.all(
        keywords.map(async (keyword: string) => {
          // check if the keyword existed before
          for (let index = 0; index < all_keywords.length; index++) {
            if (keyword === all_keywords[index].word)
              await prisma.postKeywordLink.create({
                data: { postId: post.id, keywordId: all_keywords[index].id },
              });
          }

          // if it did not return new one
          const newKeyword = await prisma.keyword.create({
            data: { word: keyword },
          });
          await prisma.postKeywordLink.create({
            data: { postId: post.id, keywordId: newKeyword.id },
          });
        })
      );

      //   delete former image
      if (image && post?.imageId) await deleteImage(post?.imageId as number);

      // disconnect and return
      await prisma.$disconnect();
      return Response.json({ post: updatedPost }, { status: 200 });
    } else {
      await prisma.$disconnect();
      return Response.json(
        { message: "Only the author if this post can delete it" },
        { status: 403 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return Response.json({
      message: error?.message || "server error",
      status: 500,
    });
  }
}

export async function DELETE(request: any) {
  try {
    const post_id = Number(request.nextUrl.searchParams.get("post_id"));
    const author_id = Number(request.nextUrl.searchParams.get("author_id"));
    console.log(author_id, post_id);

    // make sure user is authenticated
    const authenticated: any = authenticateUser();
    if (!authenticated || !(author_id === authenticated.id))
      return Response.json({ message: "Unauthorized" }, { status: 403 });

    const post = await prisma.post.findUnique({
      where: { id: post_id },
    });

    if (author_id === post?.authorId) {
      // delete image
      if (post?.imageId) await deleteImage(post?.imageId as number);

      // delete keyword pairs
      await prisma.postKeywordLink.deleteMany({ where: { postId: post?.id } });

      // delete md_content, also deletes post
      await prisma.mdContent.delete({ where: { id: post?.mdContentId } });

      // disconnect and return
      await prisma.$disconnect();
      return Response.json({}, { status: 204 });
    } else {
      await prisma.$disconnect();
      return Response.json(
        { message: "Only the author if this post can delete it" },
        { status: 403 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return Response.json({
      message: error?.message || "server error",
      status: 500,
    });
  }
}

import AuthorCreatePost from "../page";

export default function EditPost({
  params,
}: {
  params: { slug: "edit"; post_id: number };
}) {
  return (
    <AuthorCreatePost params={{ slug: "edit" }} post_id={params?.post_id} />
  );
}

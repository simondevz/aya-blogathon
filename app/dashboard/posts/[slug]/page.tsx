export default function AuthorCreatePost({
  params,
}: {
  params: { slug: "create" | "edit" };
}) {
  return (
    <div className="flex flex-col gap-4">
      <h1>{params.slug} posts page</h1>
      <form className="flex flex-col gap-2 m-4 w-1/4">
        <input name="title" placeholder="title" />
        <input name="keywords" placeholder="keywords" />
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Article Picture</label>
          <input name="image" type="file" id="image" placeholder="image" />
        </div>
        <div className="flex gap-2">
          <input name="role" id="role" type="checkbox" placeholder="role" />
          <label htmlFor="role">Save as Draft</label>
        </div>
        <textarea name="text" placeholder="Article text" />
      </form>
      <div className="flex flex-col gap-2 w-1/4">
        <button>{params.slug} posts</button>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Post() {
  return (
    <div className="flex flex-col">
      <h1>Post Page</h1>
      <span>Here are links to:-</span>
      <Link href={"/post/list"}>list posts</Link>
      <Link href="/post/1">Link to post 1</Link>
      <Link href="/post/2">Link to post 2</Link>

      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <strong>ps: this page probably won't be in the final cut</strong>
    </div>
  );
}

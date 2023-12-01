import Link from "next/link";

export default function ListPostPage() {
  return (
    <div className="flex flex-col">
      <h1>This is where List of Posts will be</h1>
      <span>Here are links to:-</span>
      <Link href="/post/1">Link to post 1</Link>
      <Link href="/post/2">Link to post 2</Link>
    </div>
  );
}

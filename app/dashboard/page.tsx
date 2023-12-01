import Link from "next/link";

export default function Dashdoard() {
  return (
    <div className="flex flex-col">
      <h1>Author only pages</h1>
      <span>Here are links to:-</span>
      <Link href="/dashboard">
        List of posts by the currently log in author
      </Link>
      <Link href="/dashboard/posts/create">create article</Link>
      <Link href="/dashboard/posts/edit">edit article</Link>

      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <strong>ps: this page probably won't be in the final cut</strong>
    </div>
  );
}

import Link from "next/link";

export default function Auth() {
  return (
    <div className="flex flex-col">
      <h1>Authentication Related Pages</h1>
      <span>Here are links to:-</span>
      <Link href="/auth/login">login page</Link>
      <Link href="/auth/signup">signup page</Link>

      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <strong>ps: this page probably won't be in the final cut</strong>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1>Landing Page</h1>
      <span>langing page is not live yet but here are links to:-</span>
      <Link href={"/auth"}>auth pages</Link>
      <Link href={"/post"}>post pages</Link>
      <Link href={"/dashboard"}>dashboard pages</Link>
    </div>
  );
}

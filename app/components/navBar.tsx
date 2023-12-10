import Image from "next/image";
import LoginBtn from "./loginBtn";
import Menu from "./menu";
import SearchBar from "./searchBar";
import logo from "./decentralizedIQ.svg";

export default function NavBar() {
  return (
    <nav className="flex justify-between px-10 py-2">
      <div className="flex my-auto">
        <Image
          src={logo}
          alt="logo"
          className="flex my-auto w-56 mx-[-1.35rem]"
        />
      </div>

      <div className="flex gap-6 my-auto">
        <SearchBar />
        <LoginBtn />
        <Menu />
      </div>
    </nav>
  );
}

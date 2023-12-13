import Image from "next/image";
import LoginBtn from "./loginBtn";
import Menu from "./menu";
import SearchBar from "./searchBar";
import logo from "./decentralizedIQ.svg";

export default function NavBar() {
  return (
    <nav className="flex justify-between lg:px-10 md:px-6 px-2 py-2">
      <div className="flex my-auto">
        <Image
          src={logo}
          alt="logo"
          className="flex my-auto md:w-56 w-40 md:mx-[-1.35rem] mx-[-1rem]"
        />
      </div>

      <div className="flex md:gap-6 gap-4 my-auto">
        <SearchBar />
        <LoginBtn />
        <Menu />
      </div>
    </nav>
  );
}

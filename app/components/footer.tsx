import { TbWorld } from "react-icons/tb";
import { MdFacebook } from "react-icons/md";
import {
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTwitterXLine,
} from "react-icons/ri";
import logo from "./decentralizedIQ.svg";
import Image from "next/image";
import apple from "./apple.png";
import google from "./google.png";

export default function Footer() {
  return (
    <footer className="flex md:flex-row flex-col md:gap-[0] gap-10 justify-around bg-milk lg:px-12 px-8 lg:pt-20 pt-12 lg:pb-40 pb-32">
      <div className="flex flex-col gap-4">
        <Image src={logo} alt="logo" className="lg:w-56 w-48" />
        <span className="flex lg:text-[0.75rem] text-[0.65rem] text-ash/70 text-semibold">
          <span className="flex my-auto ">&copy;</span>
          <span className="flex my-auto">
            2023 Decentralized IQ. All Rights Reserved.
          </span>
        </span>

        <div className="md:flex hidden gap-2">
          <button className="bg-[#191919] lg:scale-100 scale-90 flex gap-2 w-fit p-2 text-white rounded-lg">
            <Image src={apple} alt="apple logo" className="my-auto" />
            <span className="flex flex-col my-auto">
              <span className="text-[0.5rem] place-self-start">
                Download on the
              </span>
              <span className="text-[o.6rem] font-semibold m-[-0.2rem]">
                App Store
              </span>
            </span>
          </button>
          <button className="bg-[#191919] lg:scale-100 scale-90 flex gap-2 w-fit p-2 text-white rounded-lg lg:ml-[0rem] ml-[-0.5rem]">
            <Image src={google} alt="goole logo" className="my-auto" />
            <span className="flex flex-col my-auto">
              <span className="text-[0.5rem] place-self-start">GET IT ON</span>
              <span className="text-[o.6rem] font-semibold m-[-0.2rem]">
                Google Play
              </span>
            </span>
          </button>
        </div>
      </div>
      <div className="flex lg:text-[0.875rem] text-[0.75rem] gap-4 flex-col">
        <h3 className="font-semibold mb-4">Discover</h3>
        <div className="flex lg:text-[0.875rem] text-[0.75rem] gap-4 flex-col">
          <span>Topics</span>
          <span>Courses</span>
          <span>Glossaries</span>
          <span>Bitcoin Halving</span>
        </div>
      </div>
      <div className="flex lg:text-[0.875rem] text-[0.75rem] gap-4 flex-col">
        <h3 className="font-semibold mb-4">Products</h3>
        <div className="flex lg:text-[0.875rem] text-[0.75rem] gap-4 flex-col">
          <span>Exchange</span>
          <span>Web 3</span>
          <span>Labs</span>
          <span>Launchpad</span>
          <span>Research</span>
          <span>Trust Wallet</span>
        </div>
      </div>
      <div className="flex lg:text-[0.875rem] text-[0.75rem] gap-4 flex-col">
        <h3 className="font-semibold mb-4">Company</h3>
        <div className="flex lg:text-[0.875rem] text-[0.75rem] gap-4 flex-col">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
          <span>Disclaimer</span>
          <span>Content Request</span>
          <span>Feedback</span>
          <span>Support</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 flexx">
        <div className="flex gap-2">
          <RiInstagramFill className={"w-[1.2rem] h-[1.2rem]"} />
          <RiTwitterXLine className={"w-[1.2rem] h-[1.2rem]"} />
          <MdFacebook className={"w-[1.2rem] h-[1.2rem]"} />
          <RiLinkedinBoxFill className={"w-[1.2rem] h-[1.2rem]"} />
        </div>
        <div className="flex text-[0.75rem] gap-2">
          <span className="my-auto">
            <TbWorld className={"w-[1.2rem] h-[1.2rem]"} />
          </span>
          <span className="my-auto">English</span>
        </div>
      </div>
    </footer>
  );
}

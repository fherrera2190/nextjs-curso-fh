"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  title: string;
  icon: React.ReactNode;
}

export const SideBarItem = ({ path, title, icon }: Props) => {
  const currenPath = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl 
            hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
            ${
              currenPath === path &&
              "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};

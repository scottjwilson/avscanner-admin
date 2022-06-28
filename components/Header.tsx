import { linkData } from "@/data/links";
import Link from "next/link";

import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useRouter } from "next/router";
import ThemeChanger from "./ThemeChanger";
import Logo from "./Logo";

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <div className="w-full p-2 flex justify-center md:justify-between items-center mb-4 fixed inset-x-0 z-10 bg-base-100 border-b shadow-md">
      <Logo />
      <ThemeChanger />
      <div className="flex items-center space-x-4">
        <Navbar />
        <UserDiv user={user} />
      </div>
    </div>
  );
}

function Navbar() {
  const classes = `hidden md:flex justify-evenly `;
  const router = useRouter();
  return (
    <div className={classes}>
      {linkData.map((link) => (
        <Link key={link.id} href={link.href}>
          <a
            className={
              router.pathname === link.href
                ? "btn btn-ghost border-primary border-b-4"
                : "btn btn-ghost"
            }
          >
            {link.text}
          </a>
        </Link>
      ))}
    </div>
  );
}

function UserDiv({ user }: any) {
  return (
    <div className="md:flex hidden">
      {user ? (
        <Link href="/dashboard">
          <a className="btn">my account</a>
        </Link>
      ) : (
        <Link href="/signin">
          <a className="btn ">login</a>
        </Link>
      )}
    </div>
  );
}

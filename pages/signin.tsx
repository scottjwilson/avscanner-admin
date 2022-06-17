import { useUser } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { AiOutlineMail } from "react-icons/ai";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { NextSeo } from "next-seo";

export default function SignInPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabaseClient.auth.signIn({
      email,
      password,
    });
    if (error) {
      alert(JSON.stringify(error));
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      router.push("/");
    }
    // if (user && cart.length === 0) {
    //   router.push("/menu");
    // }
    // if (user && cart.length > 0) {
    //   router.push("/checkout");
    // }
  }, [user, router]);

  return (
    <>
      <NextSeo
        title={`${process.env.NEXT_PUBLIC_SITE_TITLE} -  Sign In`}
        description="AV Scanner News Sign In"
      />
      <div className="max-w-md mx-auto">
        <div className="mx-4  p-4 rounded-xl bg-base-300 shadow-xl">
          <h1 className="text-center mt-2">Sign In</h1>
          {JSON.stringify(user)}

          {/* <GoogleLogin /> */}
          <form className="form-control" onSubmit={onSubmit} method="post">
            {/* <FBLoginBtm /> */}

            <div className="mt-8 mb-4">
              <h2 className="text-center w-full border-b leading-[.1em] m-[10px 0 20px]">
                <span className="bg-primary rounded px-3">OR</span>
              </h2>
            </div>

            <div className="flex justify-center space-x-2 items-center">
              <p className="font-bold uppercase text-sm">use email</p>
              <AiOutlineMail />{" "}
            </div>
            <Link href="/signup">
              <a className="description text-center mt-2 text-sm">
                <span className="font-semibold">Need an account?</span>
                <span className="underline ml-1">Sign up here</span>
              </a>
            </Link>
            <Link href="/forgotpassword">
              <a className="description text-center mt-2 text-sm text-primary-focus">
                <span className="font-semibold"> Forgot Password?</span>
                <span className=" underline ml-1">Reset your password</span>
              </a>
            </Link>

            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-primary"
              type="email"
              placeholder="Your email"
              autoComplete="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              className="input input-primary"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <input className="syrrup" type="syrrup" name="syrrup" /> */}
            <div className="mt-6">
              <button
                type="submit"
                className="btn   btn-primary btn-block  text-white"
                disabled={loading}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

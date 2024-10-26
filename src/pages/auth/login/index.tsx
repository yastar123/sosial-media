import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/compat/router";
import { useState } from "react";
import { sign } from "crypto";

export default function Login() {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const callbackUrl: any = router?.query.callbackUrl || '/home'; 
  console.log("callbackUrl: ", callbackUrl);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        callbackUrl: callbackUrl
      });

      if (!res?.error) {
          router?.push(callbackUrl);
      } else {
        setError("Email or Password is incorrect");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  };

  const handleError = () => {
    setError("");
  };

  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <div>
        {error && (
          <>
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-16 text-center items-center py-5 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
              <button
                onClick={handleError}
                className="absolute top-0 bottom-0 right-0 px-4 flex items-center"
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="mx-5 border dark:border-b-cyan-500 dark:border-t-cyan-500 border-b-cyan-500 sm:border-t-cyan-500 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-cyan-500 border-r-cyan-500 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Login
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Welcome back, enter your credentials to continue.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <div className="flex justify-between border-cyan-500">
                    <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                      Email
                    </label>
                    <div className="absolute right-3 translate-y-2 text-green-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <input
                    name="email"
                    placeholder="Example@gmail.com"
                    className="block w-full border-cyan-500 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <div className="flex justify-between">
                    <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                      Password
                    </label>
                    <div className="absolute right-3 translate-y-2 text-green-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      name="password"
                      placeholder="********"
                      className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    className="outline-none focus:outline focus:outline-sky-300"
                  />
                  <span className="text-xs">Remember me</span>
                </label>
                <Link href="/forgot-password">
                  <p className="text-sm font-medium text-foreground underline">
                    Forgot password?
                  </p>
                </Link>
              </div>
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <div onClick={() => sign}>
                  <button
                    className="inline-flex h-12 font-semibold md:h-16 animate-shimmer items-center justify-center rounded-md border bg-[linear-gradient(110deg,#000103,45%,#00B6ED,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 border-white"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
              </div>
            </form>
            <button
              onClick={() => signIn("google", { callbackUrl })}
              className="text-white text-center font-semibold w-full px-2 py-4 rounded-md  border mt-3
              hover:bg-[linear-gradient(110deg,#000103,45%,#00B6ED,55%,#000103)] hover:bg-[length:200%_100%] hover:text-white hover:animate-shimmer"
            >
              Sign With Google
            </button>
            <div className="text-center tracking-widest  justify-center text-sm md:text-lg mt-4 flex ">
              not have an account?{" "}
              <a href="/auth/register" className="text-foreground underline text-blue-600">
                <p>Sign Up</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

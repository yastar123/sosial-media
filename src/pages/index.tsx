import { LampContainer } from "@/ui/lamp";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  const user = data?.user as {
    email: string;
    fullname: string;
    image?: string | null;
  };
  console.log("user", user?.fullname);
  const handleClick = () => {
    signIn()
  };

  return (
    <>
      <LampContainer >
        <motion.h1
          initial={{ opacity: 0.5, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Selamat Datang <br /> di Aplikasi ini 🔥🔥
        </motion.h1>
        <button
          className="inline-flex h-12 md:h-16 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#00B6ED,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={handleClick}
        >
          Login
        </button>
      </LampContainer>
    </>
  );
}

import ImageUpload from "@/component/layout/uploadData";
import { useState, useEffect } from "react";
import { TracingBeam } from "@/ui/tracing-beam";

export default function Home() {
  const texts = [
    "Selamat datang di website Saya!",
    "Temukan fitur menarik yang telah kami siapkan untuk Anda.",
    "Dapatkan pengalaman browsing yang tak terlupakan!",
    "Jelajahi dan temukan informasi yang Anda butuhkan.",
    "Kami senang Anda di sini, selamat berselancar!",
  ];
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loop % texts.length;
      const fullText = texts[i];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setIsDeleting(true);
        setTypingSpeed(1000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoop(loop + 1);
        setTypingSpeed(200);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [currentText, isDeleting, typingSpeed, loop]);

  return (
    <TracingBeam className="py-10 md:text-center bg-black z-10 ">
      <div className="text-center font-bold text-white text-2xl ">
        <div className="h-[75px] px-4">
          <p className=" text-white">{currentText}</p>
        </div>
      </div>
      <ImageUpload />
    </TracingBeam>
  );
}

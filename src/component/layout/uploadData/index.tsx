import { useState, useEffect } from "react";
import { storage, firestoreApp } from "@/lib/firebase/init";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import Image from "next/image";
import {
  User,
  EllipsisVertical,
  Heart,
  MessageCircle,
  Send,
  Clipboard,
} from "lucide-react";
import ExpandableText from "@/component/elements/ExpandableText";

interface Upload {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function UploadData() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);

  const fetchUploads = async () => {
    const uploadsCollection = collection(firestoreApp, "uploads");
    const uploadsSnapshot = await getDocs(uploadsCollection);
    const uploadsList = uploadsSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      imageUrl: doc.data().imageUrl,
    }));
    setUploads(uploadsList);
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image!");
      return;
    }

    try {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      console.log("Image uploaded successfully");

      const url = await getDownloadURL(imageRef);
      console.log("Image URL:", url);

      await setDoc(doc(firestoreApp, "uploads", title), {
        title,
        description,
        imageUrl: url,
      });

      console.log("Data saved to Firestore:", {
        title,
        description,
        imageUrl: url,
      });

      fetchUploads();
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(firestoreApp, "uploads", id));
      console.log(`Document with id ${id} deleted successfully.`);
      fetchUploads();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="pl-1">
      <div className="relative p-10 flex flex-col gap-4  w-full border rounded-lg shadow-inner">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from- to-gray-500 opacity-25 z-[-1]" />

        <div className="flex flex-col">
          <span className="text-white text-lg">Upload Sesuatu</span>
          <p className="text-gray-300 text-xs text-start md:text-lg">
            Bebas Random aja wkwkwkwkw
          </p>
        </div>

        <hr className="border-gray-700" />

        <form onSubmit={handleUpload}>
          <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-slate-400">
                Fullname
              </label>
              <div className="absolute right-3 translate-y-2 text-white">
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
              type="text"
              placeholder="Nama"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoComplete="off"
              className="block w-full text-white border-0 bg-transparent p-0 text-sm placeholder:text-white focus:text-white focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
            />
          </div>
          <div className="group relative rounded-lg my-4 border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-slate-400">
                Description
              </label>
              <div className="absolute right-3 translate-y-2 text-white">
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
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              autoComplete="off"
              className="block w-full border-0 bg-transparent text-white p-0 text-sm placeholder:text-white focus:text-white focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
            />
          </div>
          <div className="flex justify-between items-center">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
              accept="image/*"
              required
              className="w-[70%]"
            />
            <button
              className="inline-flex h-10 md:h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#00B6ED,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
      <div>
        {uploads.map((upload) => (
          <li key={upload.id} className="">
            <div className="inter-var bg-black border rounded-xl">
              <div className="bg-black  md:max-w-lg md:mx-auto  relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  sm:w-[30rem] h-auto rounded-xl py-2 border ">
                <div className="flex items-center px-4 py-2">
                  <div className="bg-slate-700 mr-4 w-[50px] h-[40px] items-center  flex justify-center rounded-full">
                    <User className="w-6 h-6 text-white bg-slate-700" />
                  </div>
                  <div className="flex text-white  justify-between w-full">
                    <h3>{upload.title}</h3>
                    <EllipsisVertical className="w-6 h-6" />
                  </div>
                </div>

                <hr className="border-white" />

                <div className="w-full md:flex md:justify-center">
                  {upload.imageUrl && (
                    <Image
                      src={upload.imageUrl}
                      alt={upload.title}
                      width={400}
                      height={100}
                    />
                  )}
                </div>

                <hr className="border-white" />

                <div className="flex justify-between text-white mt-4 px-4">
                  <div className="flex gap-4">
                    <Heart className="w-6 h-6 " />
                    <MessageCircle className="w-6 h-6" />
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <Clipboard className="w-6 h-6" />
                  </div>
                </div>

                <div className=" text-start px-4 text-sm max-w-sm mt-4 w-full h-[30px] break-words  dark:text-neutral-300">
                  <ExpandableText text={upload.description} maxWords={10} />
                </div>
                <div className="mt-10 px-4 md:justify-start md:flex">
                  <button
                    className="h-10 md:h-12 md: animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#00B6ED,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    onClick={() => handleDelete(upload.id)}
                  >      
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

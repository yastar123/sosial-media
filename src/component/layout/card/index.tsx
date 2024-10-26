import Image from "next/image"
import * as React from 'react';

export default function Card() {
    return (
        <div>
            <div className="flex justify-between px-4 mt-4 text-black">
                <div className="flex justify-center items-center ">
                    <div className=" bg-slate-200 rounded-full ">
                        <Image
                            src="path/to/your/image.jpg"
                            alt="Description of the image"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="text-xs ml-2">
                        <p className="font-semibold">Username</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    :
                </div>
            </div>
            <div className="bg-slate-200 my-4 h-[60vh]">
                <Image
                    src="path/to/your/image.jpg"
                    alt="Description of the image"
                    width={40}
                    height={40}
                />
            </div>
            <div className="flex justify-between px-4">
                <div className="flex justify-between w-[40%]">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                </div>
                <div>
                    <p>4</p>
                </div>
            </div>
            <div className="mt-3 px-4">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam in exercitationem fugit</p>
                <p className="text-slate-500">Lihat Semua Komentar</p>
                <div className="flex gap-2 items-center">
                    <div className=" bg-slate-200 rounded-full ">
                        <Image
                            src="path/to/your/image.jpg"
                            alt="Description of the image" 
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="text-slate-500 text-xs">
                        <p>Tambahkan Komentar...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
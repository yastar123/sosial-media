// components/ImageList.tsx
import { useEffect, useState } from "react";
import { collection, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db }  from '../../../lib/firebase/init';
import Image from "next/image";

const ImageList = () => {
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        const q = query(collection(db, "images"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setImages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(db, "images", id));
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
                <div key={image.id} className="border p-4">
                    <Image src={image.imageURL} alt={image.title} className="w-full h-32 object-cover"
                        width={200} height={200} />
                    <h2 className="text-lg font-bold">{image.title}</h2>
                    <p>{image.description}</p>
                    <button
                        onClick={() => handleDelete(image.id)}
                        className="bg-red-500 text-white p-2 mt-2"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ImageList;

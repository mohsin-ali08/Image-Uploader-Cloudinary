"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setAlert(null);
    }
  };

  const onSubmit = async () => {
    if (!image) {
      setAlert({ type: "error", message: "Please select an image to upload." });
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setIsUploading(true);
    setAlert(null);

    try {
      const response = await fetch("http://localhost:3000/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the image.");
      }

      setIsUploading(false);
      setAlert({ type: "success", message: "Image uploaded successfully!" });
    } catch (error) {
      setIsUploading(false);
      console.error("Error:", error);
      setAlert({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Background Image using next/image */}
      <Image
        src="/background.jpg" // Path to image in the public folder
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute bg-cover inset-0 z-0"
      />

      {/* Header Section */}
      <div className=" text-white pt-10 text-center relative z-10">
        <h1 className="text-5xl font-bold">Welcome to Image World</h1>
        <p className="mt-4 text-lg">Your gateway to effortlessly upload and showcase your amazing photos</p>
      </div>

      {/* Upload Section */}
      <div className="flex justify-center items-center py-20 relative z-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Upload Your Image
          </h2>

          {alert && (
            <div
              className={`px-4 py-3 rounded-md shadow-md text-center mb-4 ${
                alert.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {alert.message}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Select an image to upload:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {isUploading ? (
            <div className="flex justify-center items-center mt-4">
              <div className="loader border-t-blue-500 animate-spin rounded-full border-4 border-gray-200 h-12 w-12"></div>
            </div>
          ) : (
            <button
              onClick={onSubmit}
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition"
            >
              Upload Image
            </button>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-700">Why Choose Us?</h2>
          <p className="mt-4 text-gray-500">
            We make your photo-sharing experience seamless, efficient, and fun.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-700">Fast Uploads</h3>
              <p className="text-gray-500 mt-2">
                Upload your images in seconds, thanks to our optimized upload system.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-700">Secure Storage</h3>
              <p className="text-gray-500 mt-2">
                Your images are safe with us, stored securely in the cloud.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-700">Beautiful Display</h3>
              <p className="text-gray-500 mt-2">
                Your photos will be displayed in a stunning, modern gallery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-10 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold">Join Image World Today</h3>
          <p className="mt-4">
            Upload, share, and enjoy your favorite moments with ease.
          </p>
          <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>
      </footer>
    </div>
  );
}

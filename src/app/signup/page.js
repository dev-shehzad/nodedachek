"use client";
import Footer from "@/app/_components/Footer/Footer";
import Link from "next/link";
import React, { useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { firebaseConfig } from "@/app/config/firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  app,
  auth,
  signInWithGoogle,
  createUserWithEmailAndPassword,
} from "@/app/config/firebaseConfig";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";

const Page = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp); // Corrected line
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User created:", userCredential.user);
        // Show success toast message
        toast.success("User created successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Redirect the user to the dashboard
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage(
            "This email is already in use. Please log in or use a different email."
          );
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("User created successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Here you can redirect the user to the new link/Dashboard
        console.log(result);
        router.push("dashboard");
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
      });
  };


  const handleAppleSignIn = () => {
    const provider = new OAuthProvider("apple.com");
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Signed In successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); // Call simulateProgress when starting the redirect
        setTimeout(() => {
          router.push("/dashboard"); // Use setTimeout to simulate async operation
        }, 3000);
        // The signed-in user info.
        console.log(result.user);
        // Redirect the user to the dashboard or perform other actions
      })
      .catch((error) => {
        console.error("Error during Apple sign-in:", error);
      });
  };

  return (
    <div className="w-full ">
      <ToastContainer />
      <div className="w-full max-w-[800px] p-[30px] mx-auto flex flex-col items-center  font-roboto">
        <img
          src="/sign up.png"
          alt=""
          className="w-[346px] h-[129px] overflow-hidden object-cover"
        />
        <div className="w-full h-auto bg-[#E6F2F8] rounded-[20px] p-[20px] py-[40px] flex flex-col items-center">
          {/* Apple and Google Sign Up Buttons (Note: These are not functional in this snippet) */}
          <div className="w-full flex gap-[21px] max-md:gap-[10px] justify-center max-md:flex-col max-md:items-center">
          <button
              onClick={handleAppleSignIn}
              className="w-[250px] h-[44.811px] gap-1 cursor-pointer rounded-md text-[16px] font-[600] bg-black text-white flex justify-center items-center"
            >
              <FaApple />
              Sign up with Apple
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="w-[250px] gap-1 h-[45px] bg-white text-gray-500 cursor-pointer rounded-xl text-[17px] font-[600] flex justify-center items-center"
            >
              <FcGoogle />
              Sign up with Google
            </button>
          </div>
          <div className="text-[36px] font-[400] py-[30px] max-md:py-[17px] max-md:text-[30px]">
            or
          </div>
          <form
            onSubmit={handleSignUp}
            className="space-y-2 md:space-y-4 w-full px-8 max-md:px-4 max-sm:px-2"
          >
            {/* Full Name Input */}
            <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
              <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                Full Name{" "}
              </div>
              <input
                type="text"
                className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {/* Email Input */}
            <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
              <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                Your Email{" "}
              </div>
              <input
                type="email"
                className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Input */}
            <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
              <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                Password{" "}
              </div>
              <input
                type="password"
                className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <div className="text-[13px] text-red-500 text-center mt-4">
                {errorMessage}
              </div>
            )}
            {/* Sign Up Button */}
            <div className="w-full flex justify-center py-8 max-md:py-8">
              <button
                type="submit"
                className="px-5 py-2.5 text-center bg-[#0076BA] hover:bg-[#3d97cb] rounded-full text-white text-md font-medium"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="w-full flex justify-center">
            <div className="text-[14px] font-[500] text-[#0076BA]">
              Already have an account?{" "}
              <Link href="/signin" className="hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;

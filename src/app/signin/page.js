"use client";
import Footer from "@/app/_components/Footer/Footer";
import Link from "next/link";
import React from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";
import { app } from "@/app/config/firebaseConfig";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = getAuth(app);
  const [signInError, setSignInError] = useState("");
 

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("User Sign in successfully!", {
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
        // Yahaan aap user ko redirect kar sakte hain ya kuch aur action le sakte hain
        console.log(result);
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

  const handleEmailSignIn = (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    setSignInError(""); // Clear any previous error message

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Handle successful sign-in
        console.log(result);
        toast.success("User Sign in successfully!", {
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
        }, 3000); // Redirect on successful sign-in
      })
      .catch((error) => {
        console.error("Firebase Error:", error.code, error.message); // Add this line for logging
        let errorMessage = ""; // Initialize errorMessage variable

        // Detailed error handling based on error.code
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "User does not exist. Please sign up first.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Please try again later.";
            break;
          case "auth/email-already-in-use":
            errorMessage =
              "Email already in use. Please use a different email or sign in.";
            break;
          case "auth/invalid-credential":
            errorMessage =
              "Invalid Email or Password. Signup first or Signup With Google";
            break;
          default:
            errorMessage = "Failed to sign in. Please Signup .";
        }

        // Update the UI or state with the specific error message
        setSignInError(errorMessage);
      });
  };

  

  return (
    <div className="w-full">
        <ToastContainer />
      <div className="w-full  max-w-[800px] p-[30px] mx-auto flex flex-col items-center  font-roboto">
        <img
          src="/NodeDa.png"
          alt=""
          className="py-8 overflow-hidden max-md:py-4"
        />
        <div className="w-full h-auto py-[40px] bg-[#E6F2F8] rounded-[20px] p-[20px] flex flex-col items-center">
          <div className="w-full flex gap-[21px] max-md:gap-[10px] justify-center max-md:flex-col max-md:items-center">
            <button
              onClick={handleAppleSignIn}
              className="w-[250px] h-[44.811px] gap-1 cursor-pointer rounded-md text-[16px] font-[600] bg-black text-white flex justify-center items-center"
            >
              <FaApple />
              Sign in with Apple
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="w-[250px] gap-1 h-[45px] bg-white text-gray-500 cursor-pointer rounded-xl text-[17px] font-[600] flex justify-center items-center"
            >
              <FcGoogle />
              Sign up with Google
            </button>
          </div>
          <div className="text-[36px] max-md:text-[30px] font-[400] py-[30px] max-md:py-[17px]">
            or
          </div>
          <form
            onSubmit={handleEmailSignIn}
            className="space-y-2 md:space-y-4 w-full px-8 max-md:px-4 max-sm:px-2"
            action="#"
          >
            <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
              <div className="text-[12px] text-[#49454F] pt-2 pl-2">Email </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div>
              <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
                <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                  Password
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                  placeholder="••••••••"
                />
              </div>
            </div>
            {signInError && (
              <div className="text-[12px] text-red-500 text-center">
                {signInError}
              </div>
            )}{" "}
            {/* Display the error message */}
            
            <div className="w-full flex justify-center py-8 max-md:py-5">
              <button
                type="submit"
                className="px-5 py-2.5 text-center bg-[#0076BA] hover:bg-[#3d97cb] rounded-full text-white text-md font-medium"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="w-full flex justify-center">
            <div className="text-[14px] font-[500] text-[#0076BA]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="hover:underline">
                Create NodeDa ID
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

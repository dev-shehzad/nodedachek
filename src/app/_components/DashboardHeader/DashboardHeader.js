"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DashboardHeader = ({ toggleSidebarVisibility }) => {
  const router = useRouter();
  const auth = getAuth();
  const [userName, setUserName] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set the user's name if available, otherwise use the email
        setUserName(user.displayName || user.email);
        setIsSignedIn(true);
      } else {
        // User is signed out
        setUserName("");
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    // Display a loading toast message
    const toastId = toast.loading("Signing out...", {
      position: "top-center",
      autoClose: false, // Prevent auto-close
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  
    signOut(auth)
      .then(() => {
        // Update the toast message to indicate success
        toast.update(toastId, {
          render: "Sign-out successful!",
          autoClose: 1000, // Close the toast after 1 second
        });
  
        // Redirect to the root page immediately after sign-out
        setTimeout(() => {
          router.push('/');
        }, 2500); // Redirect after 3 seconds
      })
      .catch((error) => {
        // Handle sign out error
        console.error("Sign out error:", error);
        toast.error("Sign out failed. Please try again.", {
          position: "top-center",
          autoClose: 5000, // 5 seconds
        });
      });
  };
  return (
    <div className="w-full  flex justify-between px-[15px] max-sm:px-[10px] py-[10px]">
        <ToastContainer />

      <div className="flex items-center">
        <img
          src="/NodeDa.png"
          alt=""
          className="max-tab:hidden w-[160px] max-md:w-[140px] max-sm:w-[140px] h-[100%] bg-cover object-cover"
        />
        <FaBars
          onClick={toggleSidebarVisibility}
          size="1.5rem"
          className="pl-2 pt-1 hidden max-tab:block"
        />
      </div>

      <div className="flex items-center m-auto">
        {/* Display the welcome message if signed in, otherwise display signed out message */}
        {/* <div className="text-black text-[18px] mx-auto">
          {isSignedIn ? `Welcome, ${userName}` : "You are signed out"}
        </div> */}
        {/* Updated to use onClick instead of href for sign out */}
       
      </div>
      <button
          onClick={handleSignOut}
          className=" px-6 max-sm:px-2 py-2 text-center bg-[#BA4300] rounded-full text-white max-sm:text-sm"
        >
          Sign Out
        </button>
    </div>
  );
};

export default DashboardHeader;
"use client";
import DashboardHeader from "@/app/_components/DashboardHeader/DashboardHeader";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { MdKey } from "react-icons/md";
import { auth } from "../config/firebaseConfig";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  onAuthStateChanged 
} from "firebase/auth";
import { useRouter } from "next/navigation";
import withAuth from "../withauth";





const Page = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showManageID, setShowManageID] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarVisible(true);
      } else {
        setIsSidebarVisible(false);
      }
    };

    // Call handleResize on initial load
    handleResize();

    // Add event listener to handle resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleManageIDClick = () => {
    setShowManageID(true);
    setShowChangePassword(false);
  };

  const handlePasswordClick = () => {
    setShowChangePassword(true);
    setShowManageID(false);
  };

  const router = useRouter();

  const handleDeleteAccountClick = async (e) => {
    e.preventDefault(); // Prevent form submission
    
    const user = auth.currentUser;
    if (!user) {
      console.error("You are not signed in.");
      // Display a message to the user indicating that they are not signed in
      return;
    }
  
    if (fullName !== user.displayName || email !== user.email) {
      console.error("Name or email does not match with the current user.");
      // Display a message to the user indicating that the provided name or email does not match with the current user
      return;
    }
  
    try {
      await user.delete();
      console.log("Account deleted successfully!");
      // Redirect to /dashboard1 after successful deletion
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      // Handle error here, possibly show a message to the user
    }
  };
  // Handle form submission
  const handleChangePassword = async () => {
  setError(''); // Clear any previous errors
  setSuccessMessage(''); // Clear any previous success messages

  if (newPassword !== confirmNewPassword) {
    setError("New passwords do not match.");
    return;
  }

  const auth = getAuth();
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    setSuccessMessage("Password updated successfully."); // Set success message

    // Clear the input fields after successful password update
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  } catch (error) {
    console.error("Error updating password:", error);
    setError("Failed to update password. Please try again.");
  }
};



  return (
    <div className="">
      <DashboardHeader toggleSidebarVisibility={toggleSidebarVisibility} />
      <div className="p-[30px] max-md:p-[10px] ">
        <div className="flex">
          {/* Sidebar */}
          <div
            className={`sidebar max-md:z-[1000] w-[23%] max-md:w-[15%] max-md:max-w-[80px] max-w-[300px] h-auto md:h-[600px] m-[12px] max-md:m-[5px] bg-[#E6F2F8] max-md:bg-white rounded-[10px] max-md:pr-3 ${
              isSidebarVisible ? "block" : "hidden"
            }`}
            style={{ display: isSidebarVisible ? "block" : "none" }}
          >
            {/* Sidebar content */}
            <div className="text-[14px] text-[#49454F] font-semibold p-3 max-md:p-1 pt-6 max-lg:hidden">
              NodeDa ID Dashboard
            </div>
            <div className="p-3 max-md:p-1">
              <h1
                className="flex items-center p-3 hover:bg-gray-200 rounded-lg transition-colors duration-200 cursor-pointer"
                onClick={handleManageIDClick}
              >
                <FaUser className="text-xl mr-2 max-md:text-sm max-md:m-auto" />
                <span className="text-sm max-md:hidden">Manage ID</span>
              </h1>
            </div>
            <div className="p-3 max-md:p-1">
              <h1
                className="flex items-center p-3 hover:bg-gray-200 rounded-lg transition-colors duration-200 cursor-pointer"
                onClick={handlePasswordClick}
              >
                <MdKey className="text-xl mr-2 max-md:text-sm max-md:m-auto " />
                <span className="text-sm max-md:hidden">Change Password</span>
              </h1>
            </div>
          </div>
          {/* Content */}
          <div className="m-[12px] max-md:mt-0 w-[70%] ml-10 max-md:w-full max-md:ml-0">
            {/* Main content */}
            {showManageID && (
              <div>
              <form onSubmit={handleDeleteAccountClick}>
                <div className="m-[12px] w-[70%] ml-10 max-md:w-full max-md:ml-0">
                  <div className="w-full py-1 bg-[#BFDDEE] rounded-[5px]">
                    <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                      Full Name
                    </div>
                    <input
                      type="text"
                      className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                      placeholder="John Doe"
                      value={fullName} // Make sure to bind fullName to the input value
                      onChange={(e) => setFullName(e.target.value)} // Handle input changes
                    />
                  </div>
                  <div className=" text-[12px] text-[#49454F] pt-3 pl-2">
                    First Name, Last Name
                  </div>
                  <div className="w-full py-1 bg-[#F6F6F6] mt-3 rounded-[5px] ">
                    <div className=" text-[11px] text-[#BFBDBF] pt-2 pl-2">
                      E-Mail
                    </div>
                    <input
                      type="email"
                      className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                      placeholder="john.doe@NodeDa.com"
                      value={email} // Make sure to bind email to the input value
                      onChange={(e) => setEmail(e.target.value)} // Handle input changes
                    />
                  </div>
                  <div className=" text-[11px] text-[#BFBDBF] pt-3 pl-2">
                    {email}
                  </div>
                  <div className=" mt-14">
                    <button
                      type="submit" // Change button type to submit
                      className=" bg-[#BA4300] p-3 text-white rounded-[15px]"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
            )}
            {showChangePassword && (
              <div>
              {/* Change Password Form */}
              <div className="m-[12px] w-[70%] ml-10 max-md:w-full max-md:ml-0">
                {/* Current Password */}
                <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
                  <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                    Current Password
                  </div>
                  <input
                    type="password"
                    className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
        
                {/* New Password */}
                <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
                  <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                    New Password
                  </div>
                  <input
                    type="password"
                    className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
        
                {/* Repeat New Password */}
                <div className="w-full py-1 rounded-[5px] mt-3 bg-[#BFDDEE] focus-within:bg-[#a8d6f1]">
                  <div className="text-[12px] text-[#49454F] pt-2 pl-2">
                    Repeat New Password
                  </div>
                  <input
                    type="password"
                    className="w-full h-full bg-transparent border-none outline-none pl-2 text-[16px] text-[#1C1B1F]"
                    placeholder="••••••••"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                {error && <div className="text-[12px] text-[#B3261E] pt-6 pl-2">{error}</div>}
         {/* Display success message */}
         {successMessage && <div className="text-[12px] text-[#28A745] pt-6 pl-2">{successMessage}</div>}
        
                <div className="mt-14">
                  <button
                    className="bg-[#BA4300] p-3 text-white rounded-[15px]"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Page);

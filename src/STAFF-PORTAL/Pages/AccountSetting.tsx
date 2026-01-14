// src/Pages/Settings/AccountSettings.tsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { Field } from "../../ADMIN-PORTAL/Components/KiduCreate";
import UserService from "../../ADMIN-PORTAL/Services/Settings/User.services";
import KiduCreate from "../../ADMIN-PORTAL/Components/KiduCreate";

const AccountSettings: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setCurrentUser(userData);
        // Pre-populate form fields
        setTimeout(() => {
          const fieldsToPopulate = {
            userId: userData.userId.toString(),
            userName: userData.userName,
            userEmail: userData.userEmail,
            phoneNumber: userData.phoneNumber,
          };

          Object.keys(fieldsToPopulate).forEach((key) => {
            const input = document.querySelector(`input[name="${key}"]`) as HTMLInputElement;
            if (input) {
              input.value = fieldsToPopulate[key as keyof typeof fieldsToPopulate];
              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
              )?.set;
              if (nativeInputValueSetter) {
                nativeInputValueSetter.call(
                  input,
                  fieldsToPopulate[key as keyof typeof fieldsToPopulate]
                );
              }
              const event = new Event("input", { bubbles: true });
              input.dispatchEvent(event);
            }
          });
        }, 100);
      } catch (error) {
        console.error("Error parsing user data:", error);
        toast.error("Unable to load user information");
      }
    } else {
      toast.error("User information not found. Please login again.");
    }
  }, []);

  const fields: Field[] = [
    { name: "userId", rules: { type: "number", label: "Id", required: false, disabled: true, colWidth: 2, }, },
    { name: "userName", rules: { type: "text", label: "User Name", required: false, disabled: true, colWidth: 4, }, },
    { name: "userEmail", rules: { type: "email", label: "Email Id", required: false, disabled: true, placeholder: "Enter email address", colWidth: 3, }, },
    { name: "phoneNumber", rules: { type: "text", label: "Phone Num", required: false, disabled: true, placeholder: "Enter phone number", colWidth: 3, }, },
    { name: "oldPassword", rules: { type: "password", label: "Old Password", required: true, minLength: 6, placeholder: "Enter current password", colWidth: 4, }, },
    { name: "newPassword", rules: { type: "password", label: "New Password", required: true, minLength: 6, placeholder: "Enter new password", colWidth: 4, }, },
    { name: "confirmPassword", rules: { type: "password", label: "Confirm Password", required: true, minLength: 6, placeholder: "Confirm new password", colWidth: 4, }, },
  ];

  const handleSubmit = async (formData: Record<string, any>) => {
    if (!currentUser) {
      throw new Error("User information not found");
    }
    // Validate that new password and confirm password match
    if (formData.newPassword !== formData.confirmPassword) {
      throw new Error("New password and confirm password do not match");
    }
    // Validate that old password and new password are different
    if (formData.oldPassword === formData.newPassword) {
      throw new Error("New password must be different from current password");
    }
    // Prepare the request data
    const changePasswordData = {
      userId: currentUser.userId,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    // Call the API
    await UserService.changePassword(changePasswordData);
  };
  // Show loading state while fetching user data
  if (!currentUser) {
    return (
      <div className="container-fluid px-2 mt-1" style={{ fontFamily: "Urbanist" }}>
        <div
          className="shadow-sm rounded p-4"
          style={{ backgroundColor: "white", maxWidth: "1200px", margin: "0 auto" }}
        >
          <p className="text-center">Loading user information...</p>
        </div>
      </div>
    );
  }

  return (
    <KiduCreate
      title="User Account Settings"
      fields={fields}
      onSubmit={handleSubmit}
      submitButtonText="Update"
      showResetButton={true}
      showBackButton={false}
      successMessage="Password changed successfully"
      errorMessage="Failed to change password. Please check your current password."
      navigateOnSuccess=""
      themeColor="#1B3763"
      containerStyle={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    />
  );
};

export default AccountSettings;
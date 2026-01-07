// src/components/User/UserEdit.tsx
import React, { useState } from "react";
import KiduEdit from "../../Components/KiduEdit";
import type { Field } from "../../Components/KiduEdit";
import type { User } from "../../Types/Settings/User.types";
import UserService from "../../Services/Settings/User.services";
import defaultUserImage from "../../Assets/Images/profile.jpg";
import CompanyPopup from "../Settings/Company/CompanyPopup";
import MemberPopup from "../Contributions/Member/MemberPopup";
import type { Company } from "../../Types/Settings/Company.types";
import type { Member } from "../../Types/Contributions/Member.types";
import { useParams } from "react-router-dom";

const UserEdit: React.FC = () => {
  useParams<{ userId: string; }>();
  const [showCompanyPopup, setShowCompanyPopup] = useState(false);
  const [showMemberPopup, setShowMemberPopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const fields: Field[] = [
    { name: "userName", rules: { type: "text", label: "User Name", required: true, minLength: 3, maxLength: 50, placeholder: "Enter user name", colWidth: 4 } },
    { name: "userEmail", rules: { type: "email", label: "Email Address", required: true, placeholder: "Enter email address", colWidth: 4 } },
    { name: "staffNo", rules: { type: "popup", label: "Staff No", required: true, colWidth: 4 } },
    { name: "phoneNumber", rules: { type: "text", label: "Phone Number", required: true, minLength: 10, maxLength: 10, placeholder: "Enter 10-digit phone number", colWidth: 4 } },
    { name: "role", rules: { type: "select", label: "Role", required: true, placeholder: "Select user role", colWidth: 4 } },
    { name: "companyId", rules: { type: "popup", label: "Company", required: true, colWidth: 4 } },
    { name: "createAt", rules: { type: "date", label: "Created At", required: false, colWidth: 4, disabled: true } },
    { name: "address", rules: { type: "textarea", label: "Address", required: false, placeholder: "Enter address", colWidth: 6 } },
    { name: "isActive", rules: { type: "toggle", label: "Is Active", required: false } },
    { name: "islocked", rules: { type: "toggle", label: "Is Locked", required: false } },
  ];

  const roleOptions = [
    { value: "Staff", label: "Staff" },
    { value: "Admin User", label: "Admin User" },
    { value: "Super Admin", label: "Super Admin" }
  ];

  const handleFetch = async (userId: string) => {
    try {
      const response = await UserService.getUserById(Number(userId));
 
      if (response.value.companyId) {
        setSelectedCompany({
          companyId: response.value.companyId,
          comapanyName: `Company ${response.value.companyId}` 
        } as Company);
      }

      if (response.value.staffNo) {
        setSelectedMember({
          staffNo: response.value.staffNo,
          name: `Staff ${response.value.staffNo}`
        } as Member);
      }
      
      return response;
    } catch (error: any) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const handleUpdate = async (userId: string, formData: Record<string, any>) => {
    try {
      if (!selectedCompany) {
        throw new Error("Please select a company");
      }

      if (!selectedMember) {
        throw new Error("Please select a staff member");
      }

      const updateData: Partial<Omit<User, 'userId' | 'auditLogs'>> = {
        userName: formData.userName.trim(),
        userEmail: formData.userEmail.trim(),
        staffNo: selectedMember.staffNo,
        phoneNumber: formData.phoneNumber.trim(),
        address: formData.address?.trim() || "",
        role: formData.role.trim(),
        isActive: Boolean(formData.isActive),
        islocked: Boolean(formData.islocked),
        companyId: selectedCompany.companyId,
      };

      if (formData.passwordHash && formData.passwordHash.trim() !== "") {
        updateData.passwordHash = formData.passwordHash;
      }

      await UserService.updateUser(Number(userId), updateData);
      
    } catch (error: any) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const popupHandlers = {
    companyId: {
      value: selectedCompany?.comapanyName ?? "",
      onOpen: () => setShowCompanyPopup(true),
      actualValue: selectedCompany?.companyId,
    },
    staffNo: {
      value: selectedMember ? `${selectedMember.staffNo} - ${selectedMember.name}` : "",
      onOpen: () => setShowMemberPopup(true),
      actualValue: selectedMember?.staffNo,
    },
  };

  return (
    <>
      <KiduEdit
        title="Edit User"
        fields={fields}
        onFetch={handleFetch}
        onUpdate={handleUpdate}
        submitButtonText="Update User"
        showResetButton={true}
        successMessage="User updated successfully!"
        errorMessage="Failed to update user. Please try again."
        paramName="userId"
        navigateBackPath="/dashboard/settings/user-list"
        loadingText="Loading User..."
        imageConfig={{
          fieldName: "profileImage",
          defaultImage: defaultUserImage,
          label: "Profile Picture",
          required: false,
          showNameField: "userName",
          showIdField: "userId",
          showLastLoginField: "lastlogin",
          editable: false
        }}
        auditLogConfig={{
          tableName: "User",
          recordIdField: "userId"
        }}
        themeColor="#1B3763"
        popupHandlers={popupHandlers}
        options={{ role: roleOptions }}
      />
      
      <CompanyPopup
        show={showCompanyPopup}
        handleClose={() => setShowCompanyPopup(false)}
        onSelect={(company) => {
          setSelectedCompany(company);
          setShowCompanyPopup(false);
        }}
      />

      <MemberPopup
        show={showMemberPopup}
        handleClose={() => setShowMemberPopup(false)}
        onSelect={(member) => {
          setSelectedMember(member);
          setShowMemberPopup(false);
        }}
      />   
    </>
  );
};

export default UserEdit;
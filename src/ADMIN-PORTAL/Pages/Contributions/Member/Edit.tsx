import React, { useState } from "react";
import type { Field } from "../../../Components/KiduEdit"; // ✅ from KiduEdit
import MemberService from "../../../Services/Contributions/Member.services";
import type { Member } from "../../../Types/Contributions/Member.types";
import KiduEdit from "../../../Components/KiduEdit";
import type { Branch } from "../../../Types/Settings/Branch.types";
import type { Designation } from "../../../Types/Settings/Designation";
import type { Category } from "../../../Types/Settings/Category.types";
import type { Status } from "../../../Types/Settings/Status.types";
import StatusPopup from "../../Settings/Status/StatusPopup";
import CategoryPopup from "../../Settings/Category/CategoryPopup";
import DesignationPopup from "../../Settings/Designation/DesignationPopup";
import BranchPopup from "../../Branch/BranchPopup";

const MemberEdit: React.FC = () => {

   // Popup states
    const [showBranchPopup, setShowBranchPopup] = useState(false);
    const [showDesignationPopup, setShowDesignationPopup] = useState(false);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    
    // Selected values
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [selectedDesignation, setSelectedDesignation] = useState<Designation | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  
  const fields: Field[] = [
    { name: "memberId", rules: { type: "number", label: "Member ID", disabled: true, required: false, colWidth: 3 } },
    { name: "staffNo", rules: { type: "number", label: "Staff No", required: true, colWidth: 3 } },
    { name: "name", rules: { type: "text", label: "Name", required: true, minLength: 2, maxLength: 150, colWidth: 6 } }, // ✅ minLength

    { name: "genderId", rules: { type: "number", label: "Gender ID", required: true, colWidth: 3 } },
    { name: "designationId", rules: { type: "number", label: "Designation ID", required: true, colWidth: 3 } },
    { name: "categoryId", rules: { type: "number", label: "Category ID", required: true, colWidth: 3 } },
    { name: "branchId", rules: { type: "number", label: "Branch ID", required: true, colWidth: 3 } },

    { name: "dob", rules: { type: "date", label: "Date of Birth", required: true, colWidth: 4 } },
    { name: "doj", rules: { type: "date", label: "Date of Joining", required: true, colWidth: 4 } },
    { name: "dojtoScheme", rules: { type: "date", label: "DOJ to Scheme", required: true, colWidth: 4 } },

    { name: "statusId", rules: { type: "number", label: "Status ID", required: true, colWidth: 3 } },
    { name: "isRegCompleted", rules: { type: "toggle", label: "Registration Completed", required: false } },

    { name: "imageId", rules: { type: "number", label: "Image ID", required: false, colWidth: 3 } },
    { name: "profileImageSrc", rules: { type: "text", label: "Profile Image Src", required: false, colWidth: 6 } },

    { name: "nominee", rules: { type: "text", label: "Nominee Name", required: false, colWidth: 4 } },
    { name: "nomineeRelation", rules: { type: "text", label: "Nominee Relation", required: false, colWidth: 4 } },
    { name: "nomineeIDentity", rules: { type: "text", label: "Nominee Identity", required: false, colWidth: 4 } },

    { name: "unionMember", rules: { type: "text", label: "Union Member (Yes/No)", required: false, colWidth: 3 } },
    { name: "totalRefund", rules: { type: "text", label: "Total Refund", required: false, colWidth: 3 } },
  ];

  const toIsoMidnight = (val?: string) => (val ? `${val}T00:00:00` : "");

  const handleFetch = async (memberId: string) => {
    const response = await MemberService.getMemberById(Number(memberId));
    return response; // KiduEdit expects CustomResponse
  };

  const handleUpdate = async (memberId: string, formData: Record<string, any>) => {
     if (!selectedBranch) {
      throw new Error("Please select a branch");
    }
    if (!selectedDesignation) {
      throw new Error("Please select a designation");
    }
    if (!selectedCategory) {
      throw new Error("Please select a category");
    }
    if (!selectedStatus) {
      throw new Error("Please select a status");
    }
    // Match Branch-style: send only updatable fields; ID goes in the URL
    const payload: Partial<Omit<Member, "memberId" | "auditLogs">> = {
      staffNo: Number(formData.staffNo),
      designationId: Number(formData.designationId),
      categoryId: Number(formData.categoryId),
      branchId: Number(formData.branchId),
      name: formData.name?.trim() || "",
      genderId: Number(formData.genderId),
      imageId: formData.imageId !== undefined ? Number(formData.imageId) : undefined,

      dob: toIsoMidnight(formData.dob),
      dobString: toIsoMidnight(formData.dob),
      doj: toIsoMidnight(formData.doj),
      dojString: toIsoMidnight(formData.doj),
      dojtoScheme: toIsoMidnight(formData.dojtoScheme),
      dojtoSchemeString: toIsoMidnight(formData.dojtoScheme),

      statusId: Number(formData.statusId),
      isRegCompleted: Boolean(formData.isRegCompleted),

      // omit created/modified fields from update body unless your API requires them
      nominee: formData.nominee?.trim() || "",
      profileImageSrc: formData.profileImageSrc?.trim() || "",
      nomineeRelation: formData.nomineeRelation?.trim() || "",
      nomineeIDentity: formData.nomineeIDentity?.trim() || "",
      unionMember: formData.unionMember?.trim() || "",
      totalRefund: formData.totalRefund !== undefined ? String(formData.totalRefund) : undefined,
    };

    await MemberService.updateMember(Number(memberId), payload);
  };
  // Popup handlers
  const popupHandlers = {
    branchId: {
      value: selectedBranch ? `${selectedBranch.dpCode} - ${selectedBranch.name}` : "",
      onOpen: () => setShowBranchPopup(true),
    },
    designationId: {
      value: selectedDesignation?.name || "",
      onOpen: () => setShowDesignationPopup(true),
    },
    categoryId: {
      value: selectedCategory?.name || "",
      onOpen: () => setShowCategoryPopup(true),
    },
    statusId: {
      value: selectedStatus?.name || "",
      onOpen: () => setShowStatusPopup(true),
    },
  };

  return (
   <>
      <KiduEdit
        title="Edit Member"
        fields={fields}
        onFetch={handleFetch}
        onUpdate={handleUpdate}
        submitButtonText="Update Member"
        showResetButton
        successMessage="Member updated successfully!"
        errorMessage="Failed to update member. Please try again."
        paramName="memberId"
        navigateBackPath="/dashboard/member/member-list"
        loadingText="Loading Member..."
        auditLogConfig={{ tableName: "Member", recordIdField: "memberId" }}
        themeColor="#18575A"
        popupHandlers={popupHandlers}
      />
        <BranchPopup
        show={showBranchPopup}
        handleClose={() => setShowBranchPopup(false)}
        onSelect={setSelectedBranch}
      />

      <DesignationPopup
        show={showDesignationPopup}
        handleClose={() => setShowDesignationPopup(false)}
        onSelect={setSelectedDesignation}
      />

      <CategoryPopup
        show={showCategoryPopup}
        handleClose={() => setShowCategoryPopup(false)}
        onSelect={setSelectedCategory}
      />

      <StatusPopup
        show={showStatusPopup}
        handleClose={() => setShowStatusPopup(false)}
        onSelect={setSelectedStatus}
      /> 
   </>
  );
};

export default MemberEdit;

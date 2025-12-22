import React, { useState } from "react";
import KiduCreate from "../../Components/KiduCreate";
import type { Field } from "../../Components/KiduCreate";
import type { Branch } from "../../Types/Settings/Branch.types";
import type { State } from "../../Types/Settings/States.types";
import type { Circle } from "../../Types/Settings/Circle.types";
import BranchService from "../../Services/Settings/Branch.services";
import StatePopup from "../Settings/State/StatePopup";
import CirclePopup from "../Circle/CirclePopup";


const BranchCreate: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showStatePopup, setShowStatePopup] = useState(false);
  const [showCirclePopup, setShowCirclePopup] = useState(false);
  
  // Store selected state and circle data
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);

  const fields: Field[] = [
    {
      name: "dpCode",
      rules: {
        type: "number",
        label: "DP Code",
        required: true,
        placeholder: "Enter DP code (e.g., 501)",
        colWidth: 4,
      },
    },
    {
      name: "name",
      rules: {
        type: "text",
        label: "Branch Name",
        required: true,
        minLength: 2,
        maxLength: 150,
        placeholder: "Enter branch name (e.g., Gandhipuram Branch)",
        colWidth: 4,
      },
    },
    {
      name: "address1",
      rules: {
        type: "text",
        label: "Address Line 1",
        required: true,
        placeholder: "Enter address line 1",
        colWidth: 4,
      },
    },
    {
      name: "address2",
      rules: {
        type: "text",
        label: "Address Line 2",
        required: false,
        placeholder: "Enter address line 2",
        colWidth: 4,
      },
    },
    {
      name: "address3",
      rules: {
        type: "text",
        label: "Address Line 3",
        required: false,
        placeholder: "Enter address line 3",
        colWidth: 4,
      },
    },
    {
      name: "district",
      rules: {
        type: "text",
        label: "District",
        required: true,
        placeholder: "Enter district (e.g., Coimbatore)",
        colWidth: 4,
      },
    },
    {
      name: "stateId",
      rules: {
        type: "popup",
        label: "State",
        required: true,
        placeholder: "Select state",
        colWidth: 4,
      },
    },
    {
      name: "circleId",
      rules: {
        type: "popup",
        label: "Circle",
        required: true,
        placeholder: "Select circle",
        colWidth: 4,
      },
    },
    {
      name: "status",
      rules: {
        type: "toggle",
        label: "Active",
        required: false,
      },
    },
    {
      name: "isRegCompleted",
      rules: {
        type: "toggle",
        label: "Registration Completed",
        required: false,
      },
    },
  ];

  // Handle state selection
  const handleStateSelect = (state: State) => {
    setSelectedState(state);
    // Clear circle when state changes
    setSelectedCircle(null);
  };

  // Handle circle selection
  const handleCircleSelect = (circle: Circle) => {
    setSelectedCircle(circle);
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    setIsLoading(true);
    try {
      const payload: Omit<Branch, "branchId" | "auditLogs"> = {
        dpCode: Number(formData.dpCode),
        name: formData.name?.trim() || "",
        address1: formData.address1?.trim() || "",
        address2: formData.address2?.trim() || "",
        address3: formData.address3?.trim() || "",
        district: formData.district?.trim() || "",
        status: Boolean(formData.status),
        circleId: selectedCircle?.circleId || 0,
        stateId: selectedState?.stateId || 0,
        isRegCompleted: Boolean(formData.isRegCompleted),
      };

      await BranchService.createBranch(payload);
    } catch (err) {
      console.error("Error creating branch:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Popup handlers for KiduCreate
  const popupHandlers = {
    stateId: {
      value: selectedState?.name || "",
      onOpen: () => setShowStatePopup(true),
    },
    circleId: {
      value: selectedCircle?.name || "",
      onOpen: () => {
        if (!selectedState) {
          alert("Please select a state first");
          return;
        }
        setShowCirclePopup(true);
      },
    },
  };

  return (
    <>
      <KiduCreate
        title="Create Branch"
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText="Create Branch"
        showResetButton
        loadingState={isLoading}
        successMessage="Branch created successfully!"
        errorMessage="Failed to create branch. Please check the details and try again."
        navigateOnSuccess="/dashboard/settings/branch-list"
        navigateDelay={1200}
        themeColor="#18575A"
        popupHandlers={popupHandlers}
      />

      {/* State Popup */}
      <StatePopup
        show={showStatePopup}
        handleClose={() => setShowStatePopup(false)}
        onSelect={handleStateSelect}
      />

      {/* Circle Popup */}
      <CirclePopup
        show={showCirclePopup}
        handleClose={() => setShowCirclePopup(false)}
        onSelect={handleCircleSelect}
      />
    </>
  );
};

export default BranchCreate;
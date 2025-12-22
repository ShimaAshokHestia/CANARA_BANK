import React, { useState } from "react";
import type { Field } from "../../Components/KiduCreate";
import type { State } from "../../Types/Settings/States.types";
import CircleService from "../../Services/Settings/Circle.services";
import StateService from "../../Services/Settings/State.services";
import KiduEdit from "../../Components/KiduEdit";
import StatePopup from "../Settings/State/StatePopup";

const CircleEdit: React.FC = () => {
  const [showStatePopup, setShowStatePopup] = useState(false);
  const [selectedState, setSelectedState] = useState<State | null>(null);

  const fields: Field[] = [
    {
      name: "circleCode",
      rules: {
        type: "number",
        label: "Circle Code",
        required: true,
        placeholder: "Enter circle code",
        colWidth: 6
      }
    },
    {
      name: "name",
      rules: {
        type: "text",
        label: "Circle Name",
        required: true,
        minLength: 2,
        maxLength: 100,
        placeholder: "Enter circle name",
        colWidth: 6
      }
    },
    {
      name: "abbreviation",
      rules: {
        type: "text",
        label: "Abbreviation",
        required: true,
        minLength: 1,
        maxLength: 10,
        placeholder: "Enter abbreviation",
        colWidth: 6
      }
    },
    {
      name: "stateId",
      rules: {
        type: "popup",
        label: "State",
        required: true,
        placeholder: "Select state",
        colWidth: 6
      }
    },
    {
      name: "dateFrom",
      rules: {
        type: "date",
        label: "Date From",
        required: true,
        colWidth: 6
      }
    },
    {
      name: "dateTo",
      rules: {
        type: "date",
        label: "Date To",
        required: true,
        colWidth: 6
      }
    },
    {
      name: "isActive",
      rules: {
        type: "toggle",
        label: "Active",
        colWidth: 12
      }
    }
  ];

  const handleStateSelect = (state: State) => {
    setSelectedState(state);
  };

  const handleFetch = async (circleId: string) => {
    try {
      const circle = await CircleService.getCircleById(Number(circleId));
      
      // Fetch the state information to populate the selectedState
      if (circle?.stateId) {
        try {
          const stateResponse = await StateService.getStateById(circle.stateId);
          if (stateResponse?.value) {
            setSelectedState(stateResponse.value);
          }
        } catch (error) {
          console.error("Error fetching state:", error);
          // If state fetch fails, use the state name from the circle response
          setSelectedState({
            stateId: circle.stateId,
            name: circle.state || "Unknown State",
            abbreviation: "",
            isActive: true
          } as State);
        }
      }
      
      // Return in the format KiduEdit expects
      return {
        isSucess: true,
        value: circle
      };
    } catch (error) {
      console.error("Error fetching circle:", error);
      throw error;
    }
  };

  const handleUpdate = async (circleId: string, formData: Record<string, any>) => {
    // Validate that state is selected
    if (!selectedState) {
      throw new Error("Please select a state");
    }

    try {
      const updateData = {
        circleCode: Number(formData.circleCode),
        name: formData.name.trim(),
        abbreviation: formData.abbreviation.trim(),
        stateId: selectedState.stateId,
        dateFrom: formData.dateFrom,
        dateTo: formData.dateTo,
        isActive: Boolean(formData.isActive)
      };

      await CircleService.updateCircle(Number(circleId), updateData);
    } catch (error) {
      console.error("Error updating circle:", error);
      throw error;
    }
  };

  const popupHandlers = {
    stateId: {
      value: selectedState?.name || "",
      onOpen: () => setShowStatePopup(true)
    }
  };

  return (
    <>
      <KiduEdit
        title="Edit Circle"
        fields={fields}
        onFetch={handleFetch}
        onUpdate={handleUpdate}
        submitButtonText="Update Circle"
        showResetButton={true}
        successMessage="Circle updated successfully!"
        errorMessage="Failed to update circle. Please try again."
        paramName="circleId"
        navigateBackPath="/dashboard/settings/circle-list"
        loadingText="Loading Circle..."
        auditLogConfig={{
          tableName: "Circle",
          recordIdField: "circleId"
        }}
        popupHandlers={popupHandlers}
        themeColor="#18575A"
      />

      <StatePopup
        show={showStatePopup}
        handleClose={() => setShowStatePopup(false)}
        onSelect={handleStateSelect}
      />
    </>
  );
};

export default CircleEdit;
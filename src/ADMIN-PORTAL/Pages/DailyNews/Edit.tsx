// src/components/DailyNews/DailyNewsEdit.tsx

import React, { useState } from "react";
import type { Field } from "../../Components/KiduCreate";
import DailyNewsService from "../../Services/CMS/DailyNews.services";
import type { DailyNews } from "../../Types/CMS/DailyNews.types";
import KiduEdit from "../../Components/KiduEdit";
import type { Company } from "../../Types/Settings/Company.types";
import CompanyPopup from "../Settings/Company/CompanyPopup";


const DailyNewsEdit: React.FC = () => {

   const[showCompanyPopup,setShowCompanyPopup]=useState(false);
    const[selectedCompany,setSelectedCompany]=useState<Company|null>(null);
    
 const fields: Field[] = [
  { name: "title", rules: { type: "text", label: "Title", required: true, minLength: 3, maxLength: 200, colWidth: 6 } },
  { name: "newsDate", rules: { type: "date", label: "News Date", required: true, colWidth: 6 } },
  { name: "description", rules: { type: "textarea", label: "Description", required: true, colWidth: 12 } },
  { name: "companyId", rules: { type: "number", label: "Company ID", required: true, colWidth: 4 } },
  { name: "isActive", rules: { type: "checkbox", label: "Is Active", colWidth: 4 } },
];


  const handleFetch = async (id: string) => {
    return await DailyNewsService.getDailyNewsById(Number(id));
  };

  const handleUpdate = async (id: string, formData: Record<string, any>) => {
  const isoDate = new Date(formData.newsDate).toISOString();

  const payload: Omit<DailyNews, "auditLogs"> = {
    dailyNewsId: Number(id),
    title: formData.title.trim(),
    description: formData.description.trim(),
    newsDate: isoDate,
    newsDateString: isoDate, // ✅ REQUIRED FIX
    companyId: Number(formData.companyId),
    isActive: Boolean(formData.isActive),
    isDeleted: false,
    createdOn: formData.createdOn,
    createdBy: formData.createdBy,
  };

  await DailyNewsService.updateDailyNews(Number(id), payload);
};


   const popupHandlers={
    companyId:{
      value:selectedCompany?.comapanyName||"",
      onOpen:()=>setShowCompanyPopup(true),
    }
  }

  return (
   <>
      <KiduEdit
        title="Edit Daily News"
        fields={fields}
        onFetch={handleFetch}
        onUpdate={handleUpdate}
        submitButtonText="Update News"
        showResetButton
        successMessage="Daily news updated successfully!"
        errorMessage="Failed to update daily news."
        paramName="id"
        navigateBackPath="/dashboard/cms/dailynews-list"
        loadingText="Loading Daily News..."
        auditLogConfig={{
          tableName: "DailyNews",
          recordIdField: "dailyNewsId",
        }}
        themeColor="#18575A"
          popupHandlers={popupHandlers}
      />
        <CompanyPopup
      show={showCompanyPopup}
      handleClose={()=>setShowCompanyPopup(false)}
      onSelect={setSelectedCompany}
      />
   </>
  );
};

export default DailyNewsEdit;

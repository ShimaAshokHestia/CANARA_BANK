// KiduPopup.tsx - Fixed for KiduServerTable
import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import type { CustomResponse } from "../Types/ApiTypes";
import HttpService from "../Services/HttpService";
import KiduSearchBar from "./KiduSearchBar";
import KiduServerTable from "./KiduServerTable";

interface KiduPopupProps<T> {
  show: boolean;
  handleClose: () => void;
  title: string;
  fetchEndpoint: string;
  columns: { key: keyof T; label: string }[];
  onSelect?: (item: T) => void;
  AddModalComponent?: React.ComponentType<{
    show: boolean;
    handleClose: () => void;
    onAdded: (newItem: T) => void;
  }>;
  idKey?: string;
  rowsPerPage?: number;
}

function KiduPopup<T extends Record<string, any>>({
  show,
  handleClose,
  title,
  fetchEndpoint,
  columns,
  onSelect,
  AddModalComponent,
  idKey = "id",
  rowsPerPage = 10
}: KiduPopupProps<T>) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch data function for KiduServerTable
  const fetchData = useCallback(async (params: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
  }) => {
    try {
      // Build query params for server-side pagination and search
      const queryParams = new URLSearchParams({
        pageNumber: params.pageNumber.toString(),
        pageSize: params.pageSize.toString(),
        ...(params.searchTerm && { searchTerm: params.searchTerm })
      });

      const endpoint = `${fetchEndpoint}?${queryParams.toString()}`;
      
      const res = await HttpService.callApi<CustomResponse<T[]>>(endpoint, "GET");
      
      // Handle different response formats
      if (Array.isArray(res)) {
        return { data: res, total: res.length };
      } else if ((res.isSuccess || res.isSucess) && res.value) {
        if (Array.isArray(res.value)) {
          return { data: res.value, total: res.value.length };
        } else if (typeof res.value === "object" && "data" in res.value) {
          const valueObj = res.value as any;
          return { 
            data: Array.isArray(valueObj.data) ? valueObj.data : [],
            total: valueObj.total || valueObj.data?.length || 0
          };
        }
      }
      
      console.warn("⚠️ Unexpected API format:", res);
      return { data: [], total: 0 };
      
    } catch (err) {
      console.error("❌ Error fetching popup data:", err);
      throw err;
    }
  }, [fetchEndpoint]);

  const handleRowClick = (item: T) => {
    onSelect?.(item);
    handleClose();
  };

  const handleAddNew = () => {
    setShowAddModal(false);
    // Refresh the table by changing the key
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose} 
        size="xl" 
        centered 
        className="head-font"
      >
        <Modal.Header 
          closeButton 
          style={{ 
            backgroundColor: "#f8f9fa",
            borderBottom: "2px solid #173a6a"
          }}
        >
          <Modal.Title className="fs-5 fw-bold" style={{ color: "#173a6a" }}>
            {title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ minHeight: "400px", padding: "0" }}>
          {/* Search bar at top of modal */}
          <div className="px-3 pt-3 pb-2" style={{ backgroundColor: "#fff" }}>
            <KiduSearchBar
              onSearch={setSearchTerm}
              placeholder="Search records..."
              width="100%"
            />
          </div>

          {/* Server table without title and search (we handle search above) */}
          <div key={refreshKey}>
            <KiduServerTable
              columns={columns.map(col => ({ 
                key: String(col.key), 
                label: col.label 
              }))}
              idKey={idKey}
              fetchData={(params) => fetchData({
                ...params,
                searchTerm: searchTerm || params.searchTerm
              })}
              showActions={false}
              showSearch={false}
              showTitle={false}
              showKiduPopupButton={!!AddModalComponent}
              addButtonLabel={title.replace("Select ", "")}
              onRowClick={handleRowClick}
              onAddClick={() => setShowAddModal(true)}
              rowsPerPage={rowsPerPage}
            />
          </div>
        </Modal.Body>
      </Modal>

      {/* Add Modal */}
      {AddModalComponent && (
        <AddModalComponent
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          onAdded={handleAddNew}
        />
      )}
    </>
  );
}

export default KiduPopup;
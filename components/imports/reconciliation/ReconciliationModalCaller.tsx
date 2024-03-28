"use client";
import React, { useState } from "react";
import ExcelFileUploader from "./ExcelFileUploader";

const ReconciliationExcelModalCaller: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dataSubmitted, setDataSubmitted] = useState<boolean>(false);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [uploadState, setUploadState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [successful, setSuccessful] = useState<number>(0);

  const handleModalClose = () => {
    setModalOpen(false);
    setDataSubmitted(false);
    setUploadedData([]);
  };

  const handleDataUpload = (data: any[]) => {
    setUploadedData(data);
    setUploadState(true);
  };

  const handleSubmit = async () => {
    setDataSubmitted(true);
    setUploadState(false);

    async function fetchData(item: any) {
      try {
        // await API.post(`/type/add`, item).then((res) =>
        //   setSuccessful(successful + 1)
        // );
        console.log("success", item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchDataLoop() {
      for (const item of uploadedData) {
        await fetchData(item);
      }

      setLoading(false); // Set loading to false when all requests are completed
    }
    fetchDataLoop();
  };

  return (
    <>
      <ExcelFileUploader onDataUpload={handleDataUpload} />
      <button className="border mx-2" color="red" onClick={handleModalClose}>
        Close
      </button>
      <button
        className="border mx-2"
        color="green"
        disabled={!uploadState}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
};

export default ReconciliationExcelModalCaller;

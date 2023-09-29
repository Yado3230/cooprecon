"use client";
import React, { useState } from "react";
import { Reconciliation } from "@prisma/client";
import ExcelFileUploader from "@/components/imports/reconciliation/ExcelFileUploader";
import { useParams } from "next/navigation";
import axios from "axios";

const ReconciliationExcelModalCaller: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dataSubmitted, setDataSubmitted] = useState<boolean>(false);
  const [uploadedData, setUploadedData] = useState<Reconciliation[]>([]);
  const [uploadState, setUploadState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [successful, setSuccessful] = useState<number>(0);
  const params = useParams();

  const handleModalClose = () => {
    setModalOpen(false);
    setDataSubmitted(false);
    setUploadedData([]);
  };

  const handleDataUpload = (data: Reconciliation[]) => {
    setUploadedData(data);
    setUploadState(true);
  };

  const handleSubmit = async () => {
    setDataSubmitted(true);
    setUploadState(false);

    async function fetchData(item: Reconciliation) {
      try {
        await axios
          .post(`/api/${params.clientId}/reconciliations`, item)
          .then((res) => setSuccessful(successful + 1));
        // console.log("success", item);
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
      <div>
        <ExcelFileUploader onDataUpload={handleDataUpload} />
        <span className="flex text-xl items-center justify-center">
          {uploadedData.length} Files Found
        </span>
        {successful && (
          <span className="flex text-xl items-center justify-center">
            {successful} Data Uploaded Successfully
          </span>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg mr-4 hover:bg-red-600"
          onClick={handleModalClose}
        >
          Close
        </button>

        <button
          className="bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={!uploadState}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default ReconciliationExcelModalCaller;

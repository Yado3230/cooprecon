"use client";
import React, { useState } from "react";
import ExcelFileUploader from "@/components/imports/reconciliation/ExcelFileUploader";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import TemplateFormat from "@/components/imports/reconciliation/ExcelFormat";
import { Button } from "@/components/ui/button";

const ReconciliationExcelModalCaller: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dataSubmitted, setDataSubmitted] = useState<boolean>(false);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [uploadState, setUploadState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [successful, setSuccessful] = useState<number>(0);
  const [unsuccessful, setUnsuccessful] = useState<number>(0);
  const params = useParams();
  const router = useRouter();

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
        await axios.post(`/api/${params.clientId}/reconciliations`, item);
        setSuccessful(successful + 1);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUnsuccessful(unsuccessful + 1); // Increment the count of unsuccessful uploads
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
      <div className="border rounded shadow bg-gray-50 pb-20">
        <div className="flex items-center justify-around">
          <div>
            <div className="flex  h-40 items-center justify-center">
              <ExcelFileUploader onDataUpload={handleDataUpload} />
            </div>
            <span className="flex text-xl items-center justify-center">
              {uploadedData.length} Files Found
            </span>
            {successful > 0 && (
              <span className="flex text-xl items-center justify-center">
                Data Uploaded Successfully
              </span>
            )}
            {unsuccessful > 0 && (
              <span className="flex text-xl text-orange-500 items-center justify-center">
                {unsuccessful} Failed
              </span>
            )}
          </div>
          <div className="float-center">
            <TemplateFormat />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="destructive"
            className="mr-2"
            onClick={() => router.push(`/dashboard/${params.clientId}`)}
          >
            Close
          </Button>

          <Button
            className="bg-cyan-500 text-white"
            disabled={!uploadState}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReconciliationExcelModalCaller;

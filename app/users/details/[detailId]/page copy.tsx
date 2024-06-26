"use client";

import {
  getProcessTrackerById,
  getReconcilationDetails,
} from "@/actions/processing-action";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProcessingResponse, ReconProcessTracker } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [reconcilationDetails, setReconcilationDetails] = useState<
    ProcessingResponse[]
  >([]);
  const [singleDetail, setSingleDetail] = useState("");

  const [reconcilation, setReconcilation] = useState<ReconProcessTracker>();

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProcessTrackerById(Number(params.detailId));
      setReconcilation(res);
    };
    fetchData();
  }, [params.detailId]);

  useEffect(() => {
    if (reconcilation) {
      const fetchData = async () => {
        const res = await getReconcilationDetails(reconcilation?.date || "");
        const data = res instanceof Array ? res : [];
        setReconcilationDetails(data);
      };
      fetchData();
    }
  }, [reconcilation, params.detailId]);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-2">
        <div className="py-2 border-b">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Date: </span>
            <span className="text-gray-600">{reconcilation?.date || ""}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Process Started At:</span>
            <span className="text-gray-600">
              {reconcilation?.processingStartedAt || ""}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Process End At:</span>
            <span className="text-gray-600">
              {reconcilation?.processingEndedAt || ""}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Status:</span>
            <span className="text-gray-600">{reconcilation?.status || ""}</span>
          </div>
          <div className="text-cyan-500 mt-2 flex items-center space-x-2">
            <span>Reconciliation For</span>
            <span>{reconcilation?.date || ""}</span>
          </div>
        </div>
        <ol className="space-y-1 text-gray-500 text-sm dark:text-gray-400">
          <li className="grid grid-cols-4 border-b font-semibold my-2">
            <span className=" text-gray-600 dark:text-white"></span>
            <span className="text-gray-600 dark:text-white">
              Transaction Count
            </span>
            <span className="text-gray-600 dark:text-white">Amount</span>
          </li>
          <li className="grid grid-cols-4 border-b">
            <span className=" text-gray-600 dark:text-white">SETTLED:</span>
            <span className="text-gray-600 dark:text-white">
              {reconcilationDetails.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.doneCount,
                0
              )}
            </span>
            <span className="text-gray-600 dark:text-white">
              {reconcilationDetails
                .reduce(
                  (accumulator, currentItem) =>
                    accumulator + currentItem.doneBirrAmount,
                  0
                )
                .toLocaleString()}{" "}
              ETB
            </span>
          </li>
          <li className="grid grid-cols-4 border-b">
            <span className="text-gray-600 dark:text-white">
              CBS CHECK COOP SWITCH
            </span>
            <span className="text-gray-600 dark:text-white">
              {reconcilationDetails.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.cbsCheckCoopSwitchCount,
                0
              )}
            </span>
            <span className="text-gray-600 dark:text-white">
              {reconcilationDetails
                .reduce(
                  (accumulator, currentItem) =>
                    accumulator + currentItem.cbsCheckCoopSwitchBirrAmount,
                  0
                )
                .toLocaleString()}{" "}
              ETB
            </span>
            <Button
              className="text-gray-600 w-8 h-8 whitespace-nowrap"
              size="icon"
              variant="outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-notebook-pen"
              >
                <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                <path d="M2 6h4" />
                <path d="M2 10h4" />
                <path d="M2 14h4" />
                <path d="M2 18h4" />
                <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
              </svg>
            </Button>
          </li>
          <li className="grid grid-cols-4 border-b">
            <span className="text-gray-600 dark:text-white">CBS CHECK EJ</span>{" "}
            <span className="text-gray-600 dark:text-white">
              {reconcilationDetails.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.cbsCheckEJCount,
                0
              )}
            </span>{" "}
            <span className="text-gray-600 dark:text-white">
              {reconcilationDetails
                .reduce(
                  (accumulator, currentItem) =>
                    accumulator + currentItem.cbsCheckEJBirrAmount,
                  0
                )
                .toLocaleString()}{" "}
              ETB
            </span>
            <Button
              className="text-gray-600 w-8 h-8 whitespace-nowrap"
              size="icon"
              variant="outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-notebook-pen"
              >
                <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                <path d="M2 6h4" />
                <path d="M2 10h4" />
                <path d="M2 14h4" />
                <path d="M2 18h4" />
                <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
              </svg>
            </Button>
          </li>
          <li className="grid grid-cols-4 border-b">
            <span className="text-gray-600 dark:text-white">
              ETH CHECK COOP SWITCH
            </span>{" "}
            <span className="text-gray-600 dark:text-white">
              {reconcilationDetails.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.ethCheckCoopSwitchCount,
                0
              )}
            </span>{" "}
            <span className="text-gray-600 dark:text-white">
              {reconcilationDetails
                .reduce(
                  (accumulator, currentItem) =>
                    accumulator + currentItem.ethCheckCoopSwitchAmount,
                  0
                )
                .toLocaleString()}{" "}
              ETB
            </span>
            <Button
              className="text-gray-600 w-8 h-8 whitespace-nowrap"
              size="icon"
              variant="outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-notebook-pen"
              >
                <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                <path d="M2 6h4" />
                <path d="M2 10h4" />
                <path d="M2 14h4" />
                <path d="M2 18h4" />
                <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
              </svg>
            </Button>
          </li>
          <li className="grid grid-cols-4 border-b">
            <span className="text-gray-600 dark:text-white">ETH CHECK EJ</span>{" "}
            <span className="text-gray-600 dark:text-white">
              {reconcilationDetails.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.ethCheckEJCount,
                0
              )}
            </span>{" "}
            <span className="text-gray-600 dark:text-white">
              {reconcilationDetails
                .reduce(
                  (accumulator, currentItem) =>
                    accumulator + currentItem.ethCheckEJBirrAmount,
                  0
                )
                .toLocaleString()}{" "}
              ETB
            </span>
            <Button
              className="text-gray-600 w-8 h-8 whitespace-nowrap"
              size="icon"
              variant="outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-notebook-pen"
              >
                <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                <path d="M2 6h4" />
                <path d="M2 10h4" />
                <path d="M2 14h4" />
                <path d="M2 18h4" />
                <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
              </svg>
            </Button>
          </li>
        </ol>
      </div>
      <div className="col-span-2">
        <div>
          <Select onValueChange={(value) => setSingleDetail(value)}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a bank" />
            </SelectTrigger>
            <SelectContent className="h-72">
              <SelectGroup>
                <SelectLabel>Banks</SelectLabel>
                {reconcilationDetails.map((item, index) => (
                  <SelectItem key={index} value={item.id.toString()}>
                    {item.bankName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {singleDetail.length > 0 &&
          reconcilationDetails
            .filter((item) => item.id.toString() === singleDetail)
            .map((item, index) => (
              <div key={index}>
                <h2 className="mb-2 text-lg border-b mt-3 text-cyan-500 dark:text-white">
                  {item.bankName || ""} Reconcilation For{" "}
                  {reconcilation?.date || ""}:
                </h2>
                <ol className="space-y-1 text-gray-500 text-sm dark:text-gray-400">
                  <li className="grid grid-cols-4 border-b font-semibold my-2">
                    <span className=" text-gray-600 dark:text-white"></span>
                    <span className="text-gray-600 dark:text-white">
                      Transaction Count
                    </span>
                    <span className="text-gray-600 dark:text-white">
                      Amount
                    </span>
                  </li>
                  <li className="grid grid-cols-4 border-b">
                    <span className=" text-gray-600 dark:text-white">
                      Settled:
                    </span>
                    <span className="text-gray-600 dark:text-white">
                      {item.doneCount}
                    </span>
                    <span className="text-gray-600 dark:text-white">
                      {item.doneBirrAmount.toLocaleString()} ETB
                    </span>
                    <Button
                      className="text-gray-600 w-8 h-8 whitespace-nowrap"
                      size="icon"
                      variant="outline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-notebook-pen"
                      >
                        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                        <path d="M2 6h4" />
                        <path d="M2 10h4" />
                        <path d="M2 14h4" />
                        <path d="M2 18h4" />
                        <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
                      </svg>
                    </Button>
                  </li>
                  <li className="grid grid-cols-4 border-b">
                    <span className="text-gray-600 dark:text-white">
                      CBS CHECK COOP SWITCH
                    </span>
                    <span className="text-gray-600 dark:text-white">
                      {item.cbsCheckCoopSwitchCount}
                    </span>
                    <span className="text-gray-600 dark:text-white">
                      {item.cbsCheckCoopSwitchBirrAmount.toLocaleString()} ETB
                    </span>
                    <Button
                      className="text-gray-600 w-8 h-8 whitespace-nowrap"
                      size="icon"
                      variant="outline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-notebook-pen"
                      >
                        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                        <path d="M2 6h4" />
                        <path d="M2 10h4" />
                        <path d="M2 14h4" />
                        <path d="M2 18h4" />
                        <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
                      </svg>
                    </Button>
                  </li>
                  <li className="grid grid-cols-4 border-b">
                    <span className="text-gray-600 dark:text-white">
                      CBS CHECK EJ
                    </span>{" "}
                    <span className="text-gray-600 dark:text-white">
                      {item.cbsCheckEJCount}
                    </span>{" "}
                    <span className="text-gray-600 dark:text-white">
                      {item.cbsCheckEJBirrAmount.toLocaleString()} ETB
                    </span>
                    <Button
                      className="text-gray-600 w-8 h-8 whitespace-nowrap"
                      size="icon"
                      variant="outline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-notebook-pen"
                      >
                        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                        <path d="M2 6h4" />
                        <path d="M2 10h4" />
                        <path d="M2 14h4" />
                        <path d="M2 18h4" />
                        <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
                      </svg>
                    </Button>
                  </li>
                  <li className="grid grid-cols-4 border-b">
                    <span className="text-gray-600 dark:text-white">
                      ETH CHECK COOP SWITCH
                    </span>{" "}
                    <span className="text-gray-600 dark:text-white">
                      {item.ethCheckCoopSwitchCount}
                    </span>{" "}
                    <span className="text-gray-600 dark:text-white">
                      {item.ethCheckCoopSwitchAmount.toLocaleString()} ETB
                    </span>
                    <Button
                      className="text-gray-600 w-8 h-8 whitespace-nowrap"
                      size="icon"
                      variant="outline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-notebook-pen"
                      >
                        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                        <path d="M2 6h4" />
                        <path d="M2 10h4" />
                        <path d="M2 14h4" />
                        <path d="M2 18h4" />
                        <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
                      </svg>
                    </Button>
                  </li>
                  <li className="grid grid-cols-4 border-b">
                    <span className="text-gray-600 dark:text-white">
                      ETH CHECK EJ
                    </span>{" "}
                    <span className="text-gray-600 dark:text-white">
                      {item.ethCheckEJCount}
                    </span>{" "}
                    <span className="text-gray-600 dark:text-white">
                      {item.ethCheckEJBirrAmount.toLocaleString()} ETB
                    </span>
                    <Button
                      className="text-gray-600 whitespace-nowrap"
                      size="icon"
                      variant="outline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-notebook-pen"
                      >
                        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                        <path d="M2 6h4" />
                        <path d="M2 10h4" />
                        <path d="M2 14h4" />
                        <path d="M2 18h4" />
                        <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
                      </svg>
                    </Button>
                  </li>
                </ol>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Page;

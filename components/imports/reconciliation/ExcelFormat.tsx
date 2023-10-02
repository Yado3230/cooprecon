"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { writeFile, utils } from "xlsx";

const TemplateFormat = () => {
  const wsData = [
    [
      "Transaction Reference",
      "Amount",
      "Customer Awach Account No",
      "Date",
      "Reversal Reference",
      "Letter No",
      "Interest Reference",
      "Opration",
    ],
    ["", "", "", "", "", "", "", "", "FT"],
    ["", "", "", "", "", "", "", "", "FT Reversal"],
    ["", "", "", "", "", "", "", "", "FT Reversal Next Day"],
    ["", "", "", "", "", "", "", "", "FT Lump Sum"],
    ["", "", "", "", "", "", "", "", "FT Interest"],
  ];

  const ws = utils.aoa_to_sheet(wsData);

  // Convert worksheet to workbook
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");

  // Function to download the Excel file
  const handleExportExcel = () => {
    writeFile(wb, "Template.xlsx", {
      bookType: "xlsx",
      bookSST: false,
    });
  };

  return (
    <div>
      <button
        className="ui basic button whitespace-nowrap"
        onClick={() => handleExportExcel()}
      >
        <i className="download icon"></i>
        <span className="">
          <Button variant="outline" className="bg-cyan-500 text-white">
            Download Template
          </Button>
        </span>
      </button>
    </div>
  );
};

export default TemplateFormat;
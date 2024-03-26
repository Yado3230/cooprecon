"use client";
import * as React from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import axios from "axios";
import "./superset.css";
const SupersetInstanceUrl =
  process.env.REACT_APP_SUPERSET_BASE_URL || "http://10.2.125.7:8089";
const Completed = () => {
  const fetchGuestTokenFromBackend = async () => {
    const resp = await axios.get(
      process.env.REACT_APP_SUPERSET_TOKENGEN_URL ||
        "http://10.2.125.7:8000/genGuestToken?id=37"
    );
    return resp.data;
  };
  React.useEffect(() => {
    embedDashboard({
      id:
        process.env.REACT_APP_SUPERSET_DASHBOARD_ID ||
        "33cc427e-6b23-4490-98be-c66891a652d9", //given by the Superset embedding UI
      supersetDomain: SupersetInstanceUrl,
      // @ts-ignore
      mountPoint: document.getElementById("my-superset-container"), //any html element that can contain an iframe
      fetchGuestToken: async () => fetchGuestTokenFromBackend(),
      dashboardUiConfig: {
        //dashboard UI config: hideTitle, hideTab, hideChartControls, filters.visible, filters.expanded (optional)
        // hideTitle: true,
        filters: {
          expanded: false,
        },
      },
    });
  }, []);
  return <div id="my-superset-container" className="w-screen"></div>;
};

export default Completed;

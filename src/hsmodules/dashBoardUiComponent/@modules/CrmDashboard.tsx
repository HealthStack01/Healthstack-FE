import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ViewCard from "./@sections/ViewCard";
// import ColumnChart from "../charts/ColumnChart";

import client from "../../../feathers";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import { userDetails } from "../utils/fetchUserDetails";

import { clientLineData } from "../utils/chartData/LineData";

import {
  // TotalRadOrderReceived,
  // TotalRadPendingOrder,
  // TotalRadCheckIn,
  // TotalRadDraftResult,
  // TotalRadFinalResult,
  // TotalRadPendingResult,
  ModelResult,
} from "../utils/chartData/chartDataHandler";
import CircleChart from "../charts/CircleChart";
import LineChart from "../charts/LineChart";

const CRMDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

  const orderService = client.service("order");
  const appointmentService = client.service("appointments");
  const billsService = client.service("bills");
  const clientService = client.service("client");

  const { monthNameForCurrentYear, newClientLineSeriesData } =
    clientLineData(clientService);

  const { modelResult } = ModelResult(appointmentService);

  console.log("model data ===>", {
    modelResult: modelResult,
  });

  useEffect(() => {
    const { userFullName, facilityFullName } = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);

  const inventorySaleValuePresentDataObject = {
    totalInPresentDay: 10,
    totalInPresentWeek: 20,
    totalInPresentMonth: 30,
    totalInPresentQuarter: 40,
    totalInPresentYear: 50,
  };

  return (
    <DashboardPageWrapper>
      <Box>
        <Box>
          <Typography variant="h2">
            Hello <span>{userName}</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Global Admin Module{" "}
            <span>@Front Desk {facilityName}</span>
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard count={50} title="Total SLA Created" />
          <ViewCard count={180} title="Total Proposal" />
          <ViewCard count={16} title="Total Plans Bought" />
          <ViewCard count={12} title="Total Plans Bought" />
        </StartCardWapper>

        <DashboardContainer>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              gridGap: "10px",
              gridTemplateColumns: { lg: "repeat(3, 1fr)", xs: "1fr" },
            }}
          >
            <Box sx={{ width: "100%", p: 0, pt: 2, pb: 2 }}>
              <CircleChart
                series={[763, 433]}
                labels={["Open Proposal", "Closed Deals"]}
                title="Deals"
              />
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              <LineChart
                title="Amount"
                monthArray={monthNameForCurrentYear}
                series={newClientLineSeriesData}
              />
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              <ViewCard count={20} title="Total Clinical Documentation" />
              <ViewCard count={10} title="Total Clinical Order" />
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default CRMDashboard;

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

import {
  // TotalRadOrderReceived,
  // TotalRadPendingOrder,
  // TotalRadCheckIn,
  // TotalRadDraftResult,
  // TotalRadFinalResult,
  // TotalRadPendingResult,
  ModelResult,
} from "../utils/chartData/chartDataHandler";

const GlobalAdminDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

  const facilityService = client.service("facility");

  const employeeService = client.service("employee");

  // const { totalRadOrderReceived } = TotalRadOrderReceived(orderService);
  // const { totalRadPendingOrder } = TotalRadPendingOrder(orderService);
  // const { totalRadCheckIn } = TotalRadCheckIn(appointmentService);
  // const { totalRadDraftResult } = TotalRadDraftResult(billsService);
  // const { totalRadFinalResult } = TotalRadFinalResult(billsService);

  const { modelResult } = ModelResult(employeeService);

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
          <ViewCard count={50} title="Total Facilities" />
          <ViewCard count={30} title="Total Active Facilities " />
          <ViewCard count={10} title="Total Active Facilities " />
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
              <ViewCard count={33} title="Total Employee" />
              <ViewCard count={50} title="Total appointments" />
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              {" "}
              <ViewCard count={74} title="Total Patients" />
              <ViewCard count={10} title="Total Clinical Order" />
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

export default GlobalAdminDashboard;

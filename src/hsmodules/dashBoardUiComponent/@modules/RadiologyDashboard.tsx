import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ViewCard from "./@sections/ViewCard";
import ViewCardWithFilter from "./@sections/ViewCardWithFilter";
import LineChart from "../charts/LineChart";
// import ColumnChart from "../charts/ColumnChart";

import client from "../../../feathers";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import { userDetails } from "../utils/fetchUserDetails";

import {
  TotalRadOrderReceived,
  TotalRadPendingOrder,
  TotalRadCheckIn,
  TotalRadDraftResult,
  TotalRadFinalResult,
  TotalRadPendingResult,
  ModelResult,
} from "../utils/chartData/chartDataHandler";

const RadiologyDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");

  const orderService = client.service("order");
  const appointmentService = client.service("appointments");
  const billsService = client.service("bills");

  const { totalRadOrderReceived } = TotalRadOrderReceived(orderService);
  const { totalRadPendingOrder } = TotalRadPendingOrder(orderService);
  const { totalRadCheckIn } = TotalRadCheckIn(appointmentService);
  const { totalRadDraftResult } = TotalRadDraftResult(billsService);
  const { totalRadFinalResult } = TotalRadFinalResult(billsService);

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
            Welcome to your Client Module{" "}
            <span>@Front Desk {facilityName}</span>
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard
            count={totalRadPendingOrder}
            title="Total Pending Radiology Order"
          />
          <ViewCard
            count={totalRadOrderReceived}
            title=" Total Radiology Order Received"
          />
          {/* <ViewCard count={totalRadOrderReceived} title=" Total Pending Radiiology Results" />  */}
          <ViewCardWithFilter
            count={0}
            title="Lab orders received"
            hasFilter={true}
            dataSource={inventorySaleValuePresentDataObject}
            isLoading={false}
          />
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
              <LineChart
                title="Radiology order"
                // series={labOrderReceivedLineData}
                // monthArray={monthNameForCurrentYear}
              />
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              {/* <ColumnChart
                title="Radiology Order sent"
                // series={columnDataSeries}
                // xLabels={monthNameForCurrentYear}
              /> */}
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              <ViewCard count={totalRadCheckIn} title="Total Check In" />
              <ViewCard
                count={totalRadDraftResult}
                title="Draft Radiology Result"
              />
              <ViewCard
                count={totalRadFinalResult}
                title="Final Radiology Result"
              />
            </Box>
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default RadiologyDashboard;

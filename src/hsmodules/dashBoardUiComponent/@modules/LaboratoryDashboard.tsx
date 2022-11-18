import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ViewCard from "./@sections/ViewCard";
import ViewCardWithFilter from "./@sections/ViewCardWithFilter";

import client from "../../../feathers";

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper,
} from "../core-ui/styles";
import { userDetails } from "../utils/fetchUserDetails";

import {
  LabOrderReceivedLineData,
  LabOrderReportedLineData,
} from "../utils/chartData/LineData";

import { TotalModeltDataForPresent } from "../utils/chartData/queryHandler";

import {
  TotalLabOrderPending,
  TotalLabReportPending,
  FetchTotalLabOrderReceivedWithInPresentRange,
  // FetchTotalLabReportWithInPresentRange,
  // ModelResult,
} from "../utils/chartData/chartDataHandler";
import LineChart from "../charts/LineChart";
import ColumnChart from "../charts/ColumnChart";

const LaboratoryDashboard = () => {
  const [userName, setUserName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const labResultService = client.service("labresults");
  const orderService = client.service("order");

  //query function

  const { totalLabOrderPending } = TotalLabOrderPending(orderService);
  const { totalLabReportPending } = TotalLabReportPending(labResultService);
  const { monthNameForCurrentYear, labOrderReceivedLineData } =
    LabOrderReceivedLineData(orderService);

  const { labReportLineData } = LabOrderReportedLineData(labResultService);

  const columnDataSeries = [labOrderReceivedLineData[0], labReportLineData[0]];

  const {
    totalPresentDataObject: fetchTotalLabOrderReceivedWithInPresentRange,
    isLoading,
  } = TotalModeltDataForPresent(
    orderService,
    FetchTotalLabOrderReceivedWithInPresentRange
  );

  // const {
  //   totalPresentDataObject: fetchTotalLabReportWithInPresentRange,
  // } = TotalModeltDataForPresent(
  //   orderService,
  //   FetchTotalLabReportWithInPresentRange
  // );

  // const { modelResult } = ModelResult(orderService);

  // console.log("model data ===>", {
  //   modelResult: modelResult,
  //   columnDataSerie: columnDataSeries,
  // });

  useEffect(() => {
    const { userFullName, facilityFullName } = userDetails();
    setUserName(userFullName);
    setFacilityName(facilityFullName);
  }, []);

  return (
    <DashboardPageWrapper>
      <Box>
        <Box>
          <Typography variant="h2">
            Hello <span>{userName}</span>👋
          </Typography>
          <Typography variant="body1">
            Welcome to your Laboratory Module{" "}
            <span>@Front Desk {facilityName}</span>
          </Typography>
        </Box>

        <StartCardWapper>
          <ViewCard
            count={totalLabOrderPending}
            title="Total Pending Lab Order"
          />
          <ViewCard
            count={totalLabReportPending}
            title=" Total Pending Lab Report"
          />
          <ViewCardWithFilter
            count={0}
            title="Lab orders received"
            hasFilter={true}
            dataSource={fetchTotalLabOrderReceivedWithInPresentRange}
            isLoading={isLoading}
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
                title="Lab order"
                series={labOrderReceivedLineData}
                monthArray={monthNameForCurrentYear}
              />
            </Box>
            <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              <ColumnChart
                title="Lab Order sent"
                series={columnDataSeries}
                xLabels={monthNameForCurrentYear}
              />
            </Box>
            {/* <Box sx={{ width: "100%", pt: 2, pb: 2 }}>
              <ViewCard count={56} title=" Most frequent lab tests received" />
            </Box> */}
          </Box>
        </DashboardContainer>
      </Box>
    </DashboardPageWrapper>
  );
};

export default LaboratoryDashboard;

import useFetch from "../usefetch";
import { paymentTotal } from "./queryHandler";
import useFetchData from "../useFetchData";
import useFetchOrder from "../usefetchOrder";
import { ConvertAmountToHaveComma } from "./queryHandler";
const userDetails = localStorage.getItem("user");

const facilityId = JSON.parse(userDetails).employeeData[0].facility;

export const TotalNumOfData = (service) => {
  const query = {
    $sort: { createdAt: -1 },
  };
  const { data, isPending, error } = useFetch(service, query);

  // console.log("allClientData", data);
  let totalValue = Number(data.total);
  let err = error;
  return {
    totalValue,
    isPending,
    err,
  };
};

export const TotalNumOfMaleClient = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["gender"],
    gender: "Male",
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalNumMaleClient = Number(data.total);
  let err = error;
  return {
    totalNumMaleClient,
    isPending,
    err,
  };
};

export const TotalNumOfFemaleClient = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["gender"],
    gender: "female",
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalNumFemaleClient = Number(data.total);

  let err = error;
  return {
    totalNumFemaleClient,
    isPending,
    err,
  };
};

export const TotalNumOfOtherGenderClient = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["gender"],
    gender: "",
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalNumOtherGenderClient = Number(data.total);
  let err = error;
  return {
    totalNumOtherGenderClient,
    isPending,
    err,
  };
};

export const TotalUpcomingAppointment = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["appointment_status"],
    appointment_status: "Scheduled",
  };

  const { data, isPending, error } = useFetch(service, query);

  console.log("appoint ", data);
  let totalUpcomingAppointment = Number(data.total);
  let err = error;
  return {
    totalUpcomingAppointment,
    isPending,
    err,
  };
};

export const TotalNewClientWithinAMonth = (service) => {
  const getNumDaysInCurrentMonth = new Date().getDate();
  const DAY_MS = 24 * 60 * 60 * 1000 * getNumDaysInCurrentMonth;
  const query = {
    $sort: { createdAt: -1 },
    createdAt: {
      $gt: new Date().getTime() - DAY_MS,
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalNewClient = Number(data.total);
  let err = error;
  return {
    totalNewClient,
    isPending,
    err,
  };
};

export const TotalNewClientWithinARangeOf30Day = (service) => {
  const DAY_MS60 = 24 * 60 * 60 * 1000 * 21;
  // const DAY_MS30 = 24 * 60 * 60 * 1000 * currentState;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt"],
    createdAt: {
      $gt: new Date().getTime() - DAY_MS60,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  // console.log("result data agrrgate ", {
  //   resultData: data,
  // });
  let totalNewClientWithin300Day = Number(data.total);
  let err = error;
  return {
    totalNewClientWithin300Day,
    isPending,
    err,
  };
};

export const ClientPaymentMode = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "paymentinfo"],
    facility: facilityId,
  };
  const { data, isPending, error } = useFetchData(service, query);
  let queryResults = data;

  let { paymentModeData } = paymentTotal(queryResults);
  let err = error;

  var paymentModeBarSeries = [
    {
      name: "mode of payment",
      data: paymentModeData,
    },
  ];
  return {
    paymentModeBarSeries,
    isPending,
    err,
  };
};

export const TotalDischargedPatient = (service) => {
  const query = {
    $sort: { end_time: -1 },
    $select: ["end_time"],
    end_time: {
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetch(service, query);

  let totalDischargedPatient = data.total;
  let err = error;
  return {
    totalDischargedPatient,
    isPending,
    err,
  };
};

export const FetchTotalDataForDischargedPatient = (service) => {
  const query = {
    $sort: { end_time: -1 },
    $select: ["end_time", "start_time"],
    facility: facilityId,
    end_time: {
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchData(service, query);

  let fetchTotalDataForDischargedPatient = data;
  let err = error;
  return {
    fetchTotalDataForDischargedPatient,
    isPending,
    err,
  };
};

export const TotalAdmittedPatient = (service) => {
  const query = {
    $sort: { start_time: -1 },
    $select: ["createdAt", "start_time"],
    start_time: {
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalAdmittedPatient = data.total;
  let err = error;
  return {
    totalAdmittedPatient,
    isPending,
    err,
  };
};

export const TotalPaymentMode = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "paymentinfo"],
    facility: facilityId,
  };
  const { data, isPending, error } = useFetchData(service, query);
  let queryResults = data;

  let { paymentModeData } = paymentTotal(queryResults);
  let err = error;

  var paymentModeBarSeries = [
    {
      name: "mode of payment",
      data: paymentModeData,
    },
  ];
  return {
    paymentModeBarSeries,
    isPending,
    err,
  };
};

export const TotalServiceData = (service, selectQuery) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: [selectQuery],
    facility: facilityId,
  };
  const { data, isPending, error } = useFetchData(service, query);
  let totalServiceData = data;
  let err = error;
  return {
    totalServiceData,
    isPending,
    err,
  };
};

export const TotalBedAvailable = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $selete: ["status"],
    status: "occupied",
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalBedAvailable = data.total;
  let err = error;
  return {
    totalBedAvailable,
    isPending,
    err,
  };
};

export const FetchLocationWard = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["sublocations", "locationType"],
    locationType: "Ward",
    facility: facilityId,
  };
  const { data, isPending, error } = useFetchData(service, query);
  let fetchLocationWard = data;
  let err = error;
  return {
    fetchLocationWard,
    isPending,
    err,
  };
};

export const FetchDataWithInARange = (service, gt, lt) => {
  const GT_MS = 24 * 60 * 60 * 1000 * gt;
  const LT_MS = 24 * 60 * 60 * 1000 * lt;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "start_time"],
    start_time: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime() - LT_MS,
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalDataWithInARange = data.total;
  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalAdmittedWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "start_time"],
    start_time: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalDataWithInARange = data.total;
  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalDischargedWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "end_time"],
    end_time: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalDataWithInARange = data.total;
  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalDataWithInPresentRange = (service, gt_HRs, gt_Days) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "start_time"],
    facility: facilityId,
    start_time: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchData(service, query);
  let totalDataWithInARange = data;
  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchDataWithInAYear = (
  service,
  gtPreviousYear_MS,
  ltCurrentYear_MS
) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "start_time"],
    start_time: {
      $gt: gtPreviousYear_MS,
      $lt: ltCurrentYear_MS,
    },
  };
  const { data, isPending, error } = useFetch(service, query);

  let totalDataWithInAYear = data.total;
  let err = error;
  return {
    totalDataWithInAYear,
    isPending,
    err,
  };
};

export const FetchDataWithInPresentYear = (service, gtPreviousYear_MS) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "start_time"],
    start_time: {
      $gt: gtPreviousYear_MS,
    },
  };
  const { data, isPending, error } = useFetch(service, query);

  let totalDataWithInAYear = data.total;
  let err = error;
  return {
    totalDataWithInAYear,
    isPending,
    err,
  };
};
export const FetchAdmittedWithInPresentYear = (service, gtPreviousYear_MS) => {
  const query = {
    $sort: { start_time: -1 },
    $select: ["start_time"],
    start_time: {
      $gt: gtPreviousYear_MS,
    },
  };
  const { data, isPending, error } = useFetch(service, query);

  let totalDataWithInAYear = data.total;
  let err = error;
  return {
    totalDataWithInAYear,
    isPending,
    err,
  };
};

export const FetchDischargedWithInPresentYear = (
  service,
  gtPreviousYear_MS
) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "end_time"],
    createdAt: {
      $gt: gtPreviousYear_MS,
    },
  };
  const { data, isPending, error } = useFetch(service, query);

  let totalDataWithInAYear = data.total;
  let err = error;
  return {
    totalDataWithInAYear,
    isPending,
    err,
  };
};

export const FetchOrderByDestination = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    // $select: ["createdAt", "destination"],
    order_status: "Fully Paid",
    $select: ["createdAt", "order_status"],
    order_category: "Prescription",
  };
  const {
    data: totalOrderByDestination,
    isPending,
    error,
  } = useFetchOrder(service, query);

  let err = error;
  return {
    totalOrderByDestination,
    isPending,
    err,
  };
};

export const FetchTotalPrescriptionOrderWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt"],
    order_category: "Prescription",
    createdAt: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchOrder(service, query);
  let totalDataWithInARange = data.total;
  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalPrescriptionBilledWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "order_status"],
    order_status: "Billed",
    order_category: "Prescription",
    createdAt: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchOrder(service, query);
  let totalDataWithInARange = data.total;
  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalPrescriptionPendingWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "order_status"],
    order_category: "Prescription",
    order_status: "Pending",
    createdAt: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchOrder(service, query);
  let totalDataWithInARange = data.total;
  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalPrescriptionFullyPaidWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "order_status"],
    order_status: "Fully Paid",
    order_category: "Prescription",
    createdAt: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchOrder(service, query);
  let totalDataWithInARange = data.total;
  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalSalePharmacy = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    "participantInfo.billingFacility": facilityId,
    "orderInfo.orderObj.order_category": "Prescription",
  };

  const { data, isPending, error } = useFetchData(service, query);
  var total = 0;
  data.map((dat) => {
    return (total += dat.paymentInfo.amountpaid);
  });
  const result = Math.ceil(total);
  const fetchTotalSalePharmacy = ConvertAmountToHaveComma(result);

  let err = error;
  return {
    fetchTotalSalePharmacy,
    isPending,
    err,
  };
};

export const FetchTotalQuantity = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    facility: facilityId,
  };

  const {
    data: fetchTotalQuantity,
    isPending,
    error,
  } = useFetchData(service, query);

  // const fetchTotalQuantity = ConvertAmountToHaveComma(dat);
  let err = error;
  return {
    fetchTotalQuantity,
    isPending,
    err,
  };
};

export const FetchTotalStockValueWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    facility: facilityId,
    createdAt: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchData(service, query);
  var total = 0;
  data.map((dat) => {
    return (total += dat.stockvalue);
  });
  const result = Math.ceil(total);
  const totalDataWithInARange = `₦${ConvertAmountToHaveComma(result)}`;

  // console.log("test", { total: total, data: data });

  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};
export const FetchTotalMoneyCollectedWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    "participantInfo.billingFacility": facilityId,
    createdAt: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };

  const { data, isPending, error } = useFetchData(service, query);
  var total = 0;
  data.map((dat) => {
    return (total += dat.paymentInfo.amountpaid);
  });
  const result = Math.ceil(total);
  const totalDataWithInARange = `₦${ConvertAmountToHaveComma(result)}`;

  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalSaleValueWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    "participantInfo.billingFacility": facilityId,
    "orderInfo.orderObj.order_category": "Prescription",
    createdAt: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchData(service, query);
  var total = 0;
  data.map((dat) => {
    return (total += dat.paymentInfo.amountpaid);
  });
  const result = Math.ceil(total);
  const totalDataWithInARange = `₦${ConvertAmountToHaveComma(result)}`;

  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalClientAtPharmacy = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    "participantInfo.billingFacility": facilityId,
    "orderInfo.orderObj.order_category": "Prescription",
  };

  const { data, isPending, error } = useFetchData(service, query);

  var fetchTotalClientAtPharmacy = `${ConvertAmountToHaveComma(data.length)}`;
  let err = error;
  return {
    fetchTotalClientAtPharmacy,
    isPending,
    err,
  };
};

export const FetchTotalStockQuantityWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    facility: facilityId,
    createdAt: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchData(service, query);
  var total = 0;
  data.map((dat) => {
    return (total += dat.quantity);
  });
  const totalDataWithInARange = Math.ceil(total);

  // console.log("test", { total: total, data: data });

  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalSuppiedProduct = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    facility: facilityId,
  };

  const { data, isPending, error } = useFetchData(service, query);

  var total = 0;
  data.map((dat) => {
    return (total += dat.productitems[0].quantity);
  });
  const result = Math.ceil(total);
  const fetchTotalSuppiedProduct = `${ConvertAmountToHaveComma(result)}`;

  let err = error;
  return {
    fetchTotalSuppiedProduct,
    isPending,
    err,
  };
};

export const FetchTotalRevenue = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    "participantInfo.billingFacility": facilityId,
  };

  const { data, isPending, error } = useFetchData(service, query);
  var total = 0;
  data.map((dat) => {
    return (total += dat.paymentInfo.amountpaid);
  });
  const fetchTotalRevenue = Math.ceil(total);

  let err = error;
  return {
    fetchTotalRevenue,
    isPending,
    err,
  };
};

export const FetchTotalBalance = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    "participantInfo.billingFacility": facilityId,
  };

  const { data, isPending, error } = useFetchData(service, query);
  var total = 0;
  data.map((dat) => {
    return (total += dat.paymentInfo.balance);
  });
  const fetchTotalBalance = Math.ceil(total);

  let err = error;
  return {
    fetchTotalBalance,
    isPending,
    err,
  };
};

/** query for laboratory */
export const FetchDataByQuery = (service, query) => {
  const {
    data: fetchDataByQuery,
    isPending,
    error,
  } = useFetchData(service, query, true);

  let err = error;
  return {
    fetchDataByQuery,
    isPending,
    err,
  };
};

export const TotalLabOrderPending = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    // $select: ["createdAt", "order_category"],
    destination: facilityId,
    order_category: "Laboratory",
    fulfilled: "False",
  };

  const { data, isPending, error } = useFetchData(service, query);

  const totalLabOrderPending = data.length;
  let err = error;
  return {
    totalLabOrderPending,
    isPending,
    err,
  };
};

export const TotalLabReportPending = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    facility: facilityId,
    status: "Draft",
  };

  const { data, isPending, error } = useFetchData(service, query);

  let err = error;
  const totalLabReportPending = data.length;
  return {
    totalLabReportPending,
    isPending,
    err,
  };
};

export const FetchTotalLabOrderReceivedWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    destination: facilityId,
    order_category: "Laboratory",
    createdAt: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchData(service, query);

  // console.log("data", { data: data });
  const totalDataWithInARange = ConvertAmountToHaveComma(data.length);

  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const FetchTotalLabReportWithInPresentRange = (
  service,
  gt_HRs,
  gt_Days
) => {
  const GT_HR_MS = 60 * 60 * 1000 * gt_HRs;
  const GT_Days_MS = 24 * 60 * 60 * 1000 * gt_Days;
  const GT_MS = GT_HR_MS + GT_Days_MS;

  const query = {
    $sort: { createdAt: -1 },
    facility: facilityId,
    status: "Draft",
    createdAt: {
      $gt: new Date().getTime() - GT_MS,
      $lt: new Date().getTime(),
    },
  };
  const { data, isPending, error } = useFetchData(service, query);

  // console.log("data", { data: data });
  const totalDataWithInARange = ConvertAmountToHaveComma(data.length);

  let err = error;
  return {
    totalDataWithInARange,
    isPending,
    err,
  };
};

export const ColumnDataSeries = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "paymentinfo"],
    facility: facilityId,
  };
  const { data, isPending, error } = useFetchData(service, query);
  let queryResults = data;

  let { paymentModeData } = paymentTotal(queryResults);
  let err = error;

  var columnDataSeries = [
    {
      name: "mode of payment",
      data: paymentModeData,
    },
  ];
  return {
    columnDataSeries,
    isPending,
    err,
  };
};

export const TotalRadOrderReceived = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "order_category"],
    destination: facilityId,
    order_category: "Radiology Order",
  };

  const { data, isPending, error } = useFetchData(service, query);

  let err = error;
  return {
    totalRadOrderReceived: data.length,
    isPending,
    err,
  };
};

export const TotalRadPendingOrder = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    destination: facilityId,
    order_category: "Radiology Order",
    fulfilled: "False",
  };

  const { data, isPending, error } = useFetchData(service, query);

  let err = error;
  return {
    totalRadPendingOrder: data.length,
    isPending,
    err,
  };
};

export const TotalRadCheckIn = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    $select: ["createdAt", "appointment_status"],
    facility: facilityId,
    appointment_status: "Checked In",
  };

  const { data, isPending, error } = useFetchData(service, query);

  let err = error;
  return {
    totalRadCheckIn: data.length,
    isPending,
    err,
  };
};

export const TotalRadDraftResult = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    "participantInfo.billingFacility": facilityId,
    report_status: "Draft",
    "orderInfo.orderObj.order_category": "Radiology Order",
  };

  const { data, isPending, error } = useFetchData(service, query);

  let err = error;
  return {
    totalRadDraftResult: data.length,
    isPending,
    err,
  };
};

export const TotalRadFinalResult = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    "participantInfo.billingFacility": facilityId,
    report_status: "Final",
    "orderInfo.orderObj.order_category": "Radiology Order",
  };

  const { data, isPending, error } = useFetchData(service, query);

  let err = error;
  return {
    totalRadFinalResult: data.length,
    isPending,
    err,
  };
};

export const TotalRadPendingResult = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    "participantInfo.billingFacility": facilityId,
    report_status: "Pending",
    "orderInfo.orderObj.order_category": "Radiology Order",
  };

  const { data, isPending, error } = useFetchData(service, query);

  let err = error;
  return {
    totalRadPendingResult: data.length,
    isPending,
    err,
  };
};

export const ModelResult = (service) => {
  const query = {
    $sort: { createdAt: -1 },
    // $select: ["createdAt", "appointment_status"],
    // facility: facilityId,
    //bills
    // "participantInfo.billingFacility": facilityId,
    // report_status: "Draft",
    "orderInfo.orderObj.order_category": "Radiology Order",
    // order_category: "Radiology Order",Checked In
    // fulfilled: "False",
  };

  const { data: modelResult, isPending, error } = useFetchData(service, query);

  let err = error;
  return {
    modelResult,
    isPending,
    err,
  };
};

const paymentQuery = (facilityId?: string) => {
  return {
    query: {
      $or: [
        {
          'participantInfo.paymentmode.type': 'Cash',
        },
        {
          'participantInfo.paymentmode.type': 'Family Cover',
        },
      ],
      'participantInfo.billingFacility': facilityId,
      'orderInfo.orderObj.order_category': 'Prescription',
      billing_status: 'Unpaid',
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

const queryTests = (clientId) => {
  return {
    query: {
      order_category: 'Lab Order',

      clientId,
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

export { paymentQuery, queryTests };

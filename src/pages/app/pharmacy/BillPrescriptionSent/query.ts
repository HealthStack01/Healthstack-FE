const orderQuery = (facilityId?: string, val?: string) => {
  return {
    query: {
      $or: val && [
        {
          order: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          order_status: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          clientname: {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      order_category: 'Prescription',
      fulfilled: 'False',
      destination: facilityId,
      order_status: 'Pending',
      $limit: 50,
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

export { orderQuery, queryTests };

const StoreInventoryQuery = (facilityId?: string, val?: string, storeId?: string) => {
  return {
    query: {
      $or: val && [
        {
          name: {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      facility: facilityId,
      store: storeId,
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    },
  };
};

export { StoreInventoryQuery };

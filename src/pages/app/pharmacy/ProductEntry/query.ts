const ProductEntryQuery = (facilityId?: string, val?: string, storeId?: string) => {
  return {
    query: {
      $or: [
        {
          source: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          type: {
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

export { ProductEntryQuery };

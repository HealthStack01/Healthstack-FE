import { useState, useEffect } from "react";

const useFetchData = (service, query) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    service
      .find({
        query: { ...query, $limit: 1000 },
      })
      .then((result) => {
        // Once both return, update the stat

        const resultArr = result.data.reverse();
        setIsPending(false);
        setData(resultArr);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsPending(false);
      });

    service.on("created", (data) =>
      setData((currentData) => currentData.concat(data))
    );
  }, [service]);

  return { data, isPending, error };
};

export default useFetchData;

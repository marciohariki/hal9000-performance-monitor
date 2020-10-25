import {
  useCreateDocument,
  useGetCollection,
  useGetDocument,
} from "../repository";

const COLLECTION_NAME = "metrics";

const useCreateMetric = () => {
  const result = useCreateDocument(COLLECTION_NAME);
  return {
    ...result,
    createMetric: result.createDocument,
  };
};

const useListMetrics = () => {
  return useGetCollection(COLLECTION_NAME);
};

const useGetMetric = (id) => {
  return useGetDocument(COLLECTION_NAME, id);
};

export { useCreateMetric, useListMetrics, useGetMetric };

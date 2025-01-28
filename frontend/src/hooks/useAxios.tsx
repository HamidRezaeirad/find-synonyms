import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import apiServer from "../api/api.server";

interface UseFetchResponse<T> {
  data: T | null; // Response data
  isLoading: boolean; // Loading state
  error: string | null; // Error state
  axiosRequest: (config?: AxiosRequestConfig) => Promise<void>; // Method to trigger the request manually
}

/**
 * Custom hook to perform an Axios request.
 *
 * @template T - The type of the response data.
 * @param {string} url - The URL to request.
 * @param {"GET" | "POST"} [method] - The HTTP method to use for the request. Defaults to "GET".
 * @returns {UseFetchResponse<T>} An object containing the response data, loading state, error message, and a function to manually trigger the request.
 *
 * @example
 * const { data, isLoading, error, axiosRequest } = useAxios<MyDataType>('/api/data', 'GET');
 *
 * @remarks
 * - The request is automatically triggered on the first render if a method is provided.
 * - The `axiosRequest` function can be used to manually trigger the request with additional configuration.
 */
const useAxios = <T,>(
  url: string,
  method?: "GET" | "POST"
): UseFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const axiosRequest = useCallback(
    async (config?: AxiosRequestConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiServer.request<T>({
          url,
          method,
          ...config,
        });

        setData(response.data);
      } catch (err) {
        const errorMessage =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : err instanceof Error
            ? err.message
            : "An unknown error occurred.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [url, method]
  );

  useEffect(() => {
    if (!hasFetched.current && method) {
      hasFetched.current = true;
      axiosRequest();
    }
  }, [axiosRequest]);

  return { data, isLoading, error, axiosRequest };
};

export default useAxios;

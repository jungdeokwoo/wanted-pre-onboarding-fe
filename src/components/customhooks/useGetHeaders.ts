import { useMemo } from "react";

const useGetHeaders = () => {
  const requestHeaders = useMemo(() => {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set(
      "Authorization",
      `Bearer ${localStorage.getItem("token") || ""}`
    );
    return headers;
  }, []);

  return requestHeaders;
};

export default useGetHeaders;

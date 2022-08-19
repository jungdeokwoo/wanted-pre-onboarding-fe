import { useMemo } from "react";

const FetchApi = () => {
  const requestHeaders = useMemo(() => {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set(
      "Authorization",
      `Bearer ${localStorage.getItem("token") || ""}`
    );
    return headers;
  }, [localStorage.getItem("token")]);

  const FetchUtility = {
    get: async (url: string): Promise<Response> => {
      const result = await fetch(url, { headers: requestHeaders });
      return result;
    },
    post: async <T>(url: string, parameter: T): Promise<Response> => {
      const result = fetch(url, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(parameter),
      });
      return result;
    },
    delete: async (url: string): Promise<Response> => {
      const result = fetch(url, { method: "DELETE", headers: requestHeaders });
      return result;
    },
    put: async <T>(url: string, parameter: T): Promise<Response> => {
      const result = fetch(url, {
        method: "PUT",
        headers: requestHeaders,
        body: JSON.stringify(parameter),
      });
      return result;
    },
  };

  return FetchUtility;
};

export default FetchApi;

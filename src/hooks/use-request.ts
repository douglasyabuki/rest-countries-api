"use client";

import { useState } from "react";

export function useRequest<
  TParams extends Record<string, any> = any,
  TBody = any,
  TResponse = any,
>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    plainText?: boolean;
  },
) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<TResponse | null>(null);

  const makeRequest = (body?: TBody, params?: TParams) => {
    setLoading(true);
    fetch(
      path +
        (Object.keys(params || {}).length
          ? `?${new URLSearchParams(clearParams(params as any)).toString()}`
          : ""),
      {
        body: Object.keys(body || {}).length ? JSON.stringify(body) : undefined,
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        method,
      },
    )
      .then((res) => (options?.plainText ? res.text() : res.json()))
      .then((data) => {
        setResponse(data);
        options?.onSuccess?.(data);
      })
      .catch((error) => {
        setResponse(null);
        options?.onError?.(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const request = ({ body, params }: { body?: TBody; params?: TParams } = {}) =>
    makeRequest(body, params);

  return {
    loading,
    response,
    request,
  };
}

function clearParams<T extends Record<string, any>>(params: T): T {
  const emptyValues = [undefined, {}, "", "NULL"] as const;
  const newParams = { ...params };
  for (const key in newParams) {
    if (emptyValues.includes(newParams[key])) {
      delete newParams[key];
    }
  }
  return newParams;
}

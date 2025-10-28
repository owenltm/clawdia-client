"use server";

import { cookies } from "next/headers";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions<TBody = unknown> {
  path: string;
  method?: HttpMethod;
  query?: Record<string, string | number | boolean>;
  body?: TBody;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

const BASE_URL = process.env.BASE_URL || "";
const API_KEY = process.env.API_KEY || null;

export async function requestHttp<TResponse, TBody = unknown>(
  options: FetchOptions<TBody>
): Promise<TResponse> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("auth_token");

    const { path, method = "GET", query, body, headers, signal } = options;

    // Build query string
    const queryString = query
      ? "?" +
      new URLSearchParams(
        Object.entries(query).map(([k, v]) => [k, String(v)])
      ).toString()
      : "";

    const url = `${BASE_URL}${path}${queryString}`;

    console.log(`Requesting ${method} ${url}`);

    // Prepare fetch config
    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(API_KEY ? { "x-api-key": API_KEY } : {}),
        ...(tokenCookie ? { Authorization: `Bearer ${tokenCookie.value}` } : {}),
        ...headers,
      },
      signal,
      cache: "no-cache",
    };

    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      // Optionally handle errors in a typed way
      throw new Error(`HTTP error ${response.body ? await response.text() : response.status}`);
    }

    return response.json() as Promise<TResponse>;
  } catch (error) {
    console.error("Error in requestHttp:", error);
    throw error;
  }
}
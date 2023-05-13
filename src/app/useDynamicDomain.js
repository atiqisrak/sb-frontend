"use client";
import { useEffect, useState } from "react";

export function useDynamicDomain() {
  const [domain, setDomain] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.origin);
    } else {
      // Server-side rendering fallback
      setDomain(process.env.NEXT_PUBLIC_SERVER_DOMAIN || "");
    }
  }, []);

  return domain;
}

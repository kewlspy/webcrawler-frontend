import { useEffect, useState } from "react";
import API from "../api";
import "../index.css";
import URLForm from "../components/URLForm";
import URLTable from "../components/URLTable";
import type { URLResult } from "../types";

export default function Home() {
  const [urls, setURLs] = useState<URLResult[]>([]);
  const [error, setError] = useState<string | null>(null);
// Function to fetch URLs from the API
  const fetchURLs = async () => {
    try {
      const res = await API.get("/urls");
      console.log("Fetched URLs:", res.data);
      setURLs(res.data);
      setError(null);
    } catch (err) {
      console.error("Fetch failed:", err);
      setError("Failed to fetch URLs. Please check your network connection.");
    }
  };
// Function to handle retrying a URL
  const handleRetry = async (id: number) => {
    try {
      const res = await API.post(`/urls/${id}/retry`);
      console.log("Retry response:", res.data);
      fetchURLs();
    } catch (err) {
      console.error("Retry failed:", err);
    }
  };
// Function to handle deleting a URL
  const handleDelete = async (id: number) => {
    try {
      const res = await API.delete(`/urls/${id}`);
      console.log("Delete response:", res.data);
      fetchURLs();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  useEffect(() => {
    fetchURLs();
    const interval = setInterval(fetchURLs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" bg-gray-50 p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Website Analyzer</h1>
      {error && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>
      )}

      <URLForm onRefresh={fetchURLs} />
      <URLTable
        urls={urls || []}
        handleRetry={handleRetry}
        handleDelete={handleDelete}
        // Passing empty functions for bulk actions
        handleBulkRetry={(ids) => ids.forEach(handleRetry)}
        handleBulkDelete={(ids) => ids.forEach(handleDelete)}
      />
    </div>
  );
}

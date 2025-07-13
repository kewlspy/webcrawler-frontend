import { useState } from "react";
import API from "../api";

export default function URLForm({ onRefresh }: { onRefresh: () => void }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
// This function handles the submission of the URL form
  const handleSubmit = async () => {
    if (!url.startsWith("http")) return alert("Enter a valid URL");
    try {
      setLoading(true);
      await API.post("/urls", { url });
      setUrl("");
      onRefresh();
    } catch {
      alert("Failed to submit URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border border-gray-300 text-gray-700 placeholder-gray-500 px-3 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="http://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className={`bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-700 disabled:bg-gray-400 disabled:text-gray-200`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add URL"}
      </button>
    </div>
  );
}

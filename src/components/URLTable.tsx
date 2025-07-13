import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { URLResult } from "../types";
import { ArrowUpDown, Loader2, RotateCcw, SquareX } from "lucide-react";

interface TableProps {
  urls: URLResult[];
  handleRetry: (id: number) => void;
  handleDelete: (id: number) => void;
  handleBulkRetry: (ids: number[]) => void;
  handleBulkDelete: (ids: number[]) => void;
}

export default function URLTable({
  urls,
  handleRetry,
  handleDelete,
  handleBulkRetry,
  handleBulkDelete,
}: TableProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof URLResult | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<number[]>([]);

  const itemsPerPage = 10;

  const toggleSort = (key: keyof URLResult) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(filteredData.map((url) => url.ID));
    } else {
      setSelected([]);
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  // Filtering URLs based on search input
  const filteredData = useMemo(() => {
    return urls.filter((url) =>
      url.Link.toLowerCase().includes(search.toLowerCase())
    );
  }, [urls, search]);
  //  Sorting and pagination logic
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey] || "";
      const bVal = b[sortKey] || "";
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortOrder]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by URL..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border rounded-md w-full md:w-64"
        />
        {selected.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkRetry(selected)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry Selected
            </button>
            <button
              onClick={() => handleBulkDelete(selected)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>

      <div className="overflow-auto rounded-lg">
        <table className="min-w-full text-sm text-left bg-white shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">
                <input
                  type="checkbox"
                  checked={selected.length === filteredData.length}
                  onChange={toggleSelectAll}
                />
              </th>
              {[
                { label: "Title", key: "Title" },
                { label: "URL", key: "Link" },
                { label: "Status", key: "Status" },
                { label: "HTML", key: "HTMLVersion" },
                { label: "Internal", key: "InternalLinks" },
                { label: "External", key: "ExternalLinks" },
                { label: "Broken", key: "BrokenLinks" },
              ].map(({ label, key }) => (
                <th
                  key={key}
                  className="p-2 cursor-pointer select-none"
                  onClick={() => toggleSort(key as keyof URLResult)}
                >
                  {label} <ArrowUpDown className="inline w-3 h-3" />
                </th>
              ))}
              <th className="p-2">Retry</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((url) => (
              <tr
                key={url.ID}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(url.ID)}
                    onChange={() => toggleSelect(url.ID)}
                  />
                </td>
                <td
                  className="p-2 text-slate-600 hover:bg-blue-100 font-semibold cursor-pointer"
                  onClick={() => navigate(`/details/${url.ID}`)}
                >
                  {url.Title || "-"}
                </td>
                <td className="p-2">{url.Link}</td>
                <td className="p-2">
                  {url.Status === "running" ? (
                    <Loader2 className="animate-spin inline w-4 h-4 text-blue-500" />
                  ) : (
                    url.Status
                  )}
                </td>
                <td className="p-2">{url.HTMLVersion || "-"}</td>
                <td className="p-2">{url.InternalLinks}</td>
                <td className="p-2">{url.ExternalLinks}</td>
                <td className="p-2 text-red-600">{url.BrokenLinks}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleRetry(url.ID)}
                    disabled={url.Status === "running"}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <RotateCcw />
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(url.ID)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <SquareX />
                  </button>
                </td>
              </tr>
            ))}
            {!paginatedData.length && (
              <tr>
                <td colSpan={11} className="p-4 text-center text-gray-400">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

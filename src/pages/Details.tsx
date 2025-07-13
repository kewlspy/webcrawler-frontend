import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// Recharts styles
const COLORS = ["#58a8eaff", "#2545e7ff"];

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [url, setURL] = useState<any>(null);

  useEffect(() => {
    API.get(`/urls/${id}`).then((res) => setURL(res.data));
  }, [id]);

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  const statusStyles: Record<string, string> = {
    queued: "bg-gray-200 text-gray-700",
    running: "bg-blue-200 text-blue-700",
    done: "bg-green-200 text-green-700",
    error: "bg-red-200 text-red-700",
  };
  const data = [
    { name: "Internal", value: url.InternalLinks },
    { name: "External", value: url.ExternalLinks },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Website Details
        </h2>
        <div className="mb-2 p-4 bg-blue-100 border border-gray-300 rounded-lg">
          <p className="text-gray-500">Title</p>
          <p className="font-semibold text-gray-800">{url.Title || "-"}</p>
        </div>
        <div
          className="grid grid-cols-1 bg-blue-100 border border-gray-300 shadow-sm gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 text-gray-800 text-sm font-medium divide-y divide-gray-200 rounded-lg
 border-blue-200 rounded p-6 sm:grid-cols-2 gap-4"
        >
          <div>
            <p className="text-gray-500">URL</p>
            <p className="text-blue-600 break-all">{url.Link}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                statusStyles[url.Status] || "bg-gray-100 text-gray-600"
              }`}
            >
              {url.Status}
            </span>
          </div>
          <div>
            <p className="text-gray-500">HTML Version</p>
            <p className="text-gray-800">{url.HTMLVersion || "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">Login Form</p>
            <p className="text-gray-800">{url.HasLoginForm ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-gray-500">Internal Links</p>
            <p className="text-gray-800">{url.InternalLinks}</p>
          </div>
          <div>
            <p className="text-gray-500">External Links</p>
            <p className="text-gray-800">{url.ExternalLinks}</p>
          </div>
          <div>
            <p className="text-gray-500">Broken Links</p>
            <p className="text-gray-800">{url.BrokenLinks}</p>
          </div>
        </div>
        {/* // Link Distribution Chart  */}
        <div className="mt-8 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Link Distribution</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              label
              outerRadius={80}
              dataKey="value"
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        {/* Broken Link Details */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Broken Link Details
          </h3>
          {url.BrokenLinkItems?.length ? (
            <ul className="space-y-2">
              {url.BrokenLinkItems.map((link: any, idx: number) => (
                <li
                  key={idx}
                  className="bg-red-50 border border-red-200 rounded p-3 text-sm flex justify-between items-center"
                >
                  <span className="break-all text-red-800">{link.Link}</span>
                  <span className="text-red-600 font-medium">
                    {link.Status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No broken links found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

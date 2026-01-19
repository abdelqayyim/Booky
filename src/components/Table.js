import React, { useState, useMemo } from "react";
import { ARROW_LEFT, ARROW_RIGHT } from "../constants";

const statusColorMap = {
  confirmed: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
};

const PAGE_SIZE = 5;

const Table = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [currentPage, data]);

  const startItem = (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalItems);

  return (
    <div className="lg:col-span-2 space-y-4 mt-6">
      <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--primary-20)] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-primary)]">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--primary-20)] bg-[var(--bg-secondary)]">
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-[var(--primary-20)] transition-colors"
              >
                {columns.map((col, cIdx) => {
                  const cell = row[col];

                  if (col === "Booking ID") {
                    return (
                      <td key={cIdx} className="px-6 py-4 font-mono font-bold text-[var(--primary)]">
                        {cell}
                      </td>
                    );
                  }

                  if (col === "Status") {
                    return (
                      <td key={cIdx} className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide ${
                            statusColorMap[cell?.toLowerCase()] || ""
                          }`}
                        >
                          {cell}
                        </span>
                      </td>
                    );
                  }

                  if (col === "Amount") {
                    return (
                      <td key={cIdx} className="px-6 py-4 font-bold">
                        {cell}
                      </td>
                    );
                  }

                  if (col === "Date & Time") {
                    return (
                      <td key={cIdx} className="px-6 py-4">
                        <p className="text-sm font-bold">{row.date}</p>
                        <p className="text-xs mt-1">{row.time}</p>
                      </td>
                    );
                  }

                  if (col === "Customer") {
                    const initials = cell.name
                      .split(" ")
                      .map(n => n[0])
                      .join("")
                      .toUpperCase();

                    return (
                      <td key={cIdx} className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {cell.image ? (
                            <img
                              src={cell.image}
                              alt={cell.name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                              {initials}
                            </div>
                          )}
                          <span className="text-sm font-medium">{cell.name}</span>
                        </div>
                      </td>
                    );
                  }

                  return (
                    <td key={cIdx} className="px-6 py-4 text-sm">
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between border-t border-[var(--primary-20)] bg-[var(--bg-secondary)]">
          <p className="text-xs font-medium text-slate-500">
            Showing {startItem} to {endItem} of {totalItems} bookings
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-1.5 rounded-lg border border-[var(--primary-20)] bg-[var(--bg-primary)] text-slate-500 hover:text-[var(--primary)] disabled:opacity-50"
            >
              <span className="material-symbols-outlined">{ARROW_LEFT}</span>
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`size-8 rounded-lg text-xs font-bold ${
                      page === currentPage
                        ? "bg-[var(--primary)] text-white"
                        : "text-slate-500 hover:bg-[var(--primary-20)]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              {totalPages > 5 && <span className="px-1 text-slate-400">…</span>}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-1.5 rounded-lg border border-[var(--primary-20)] bg-[var(--bg-primary)] text-slate-500 hover:text-[var(--primary)] disabled:opacity-50"
            >
              <span className="material-symbols-outlined">{ARROW_RIGHT}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

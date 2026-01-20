import React, { useState, useEffect, useMemo, useRef } from "react";
import Toggle from "../../components/Toggle";
import { FILTER_SVG, STAR_EMPTY, STAR_HALF, STAR_FULL } from "../../constants";
import Tooltip from "@mui/material/Tooltip";
import ViewCusomterHistory from "../../components/Forms/ViewCusomterHistory";
import { FORMS } from "../../components/Forms/FormsContainer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentForm } from "../../redux/ui/uiSlice";
import {
  setSelectedUserHistory,
  setSelectedUserSubscribed,
} from "../../redux/user/userSlice";
import { format } from "date-fns";
import { getServiceHistoryAndSubscribers } from "../../redux/user/apiRequests";

/* ----------------------- Helpers ----------------------- */
const filterData = (
  currentOption,
  filters,
  serviceHistory = [],
  subscribedUsers = []
) => {
  const escapeRegExp = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const nameRegex = new RegExp(escapeRegExp(filters.name), "i");

  return currentOption === "History"
    ? serviceHistory.filter((entry) => {
        return (
          nameRegex.test(entry.userName) &&
          entry.rating >= filters.rating
        );
      })
    : subscribedUsers.filter((user) =>
        nameRegex.test(user.name)
      );
};

const ITEMS_PER_PAGE = 8;

/* ----------------------- Component ----------------------- */
const ProviderUsersPage = () => {
  const dispatch = useDispatch();
  const { serviceHistory, subscribedUsers } = useSelector(
    (state) => state.user
  );

  const [currentOption, setCurrentOption] = useState("History");
  const [currentPage, setCurrentPage] = useState(1);

  /* 🔍 Live Search */
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({ name: "", rating: 0 });

  /* 🎛️ Filter dropdown */
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    dispatch(getServiceHistoryAndSubscribers());
  }, [dispatch]);

  /* 🔍 Debounce search */
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((p) => ({ ...p, name: searchInput }));
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  /* Close filter on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredData = useMemo(
    () =>
      filterData(
        currentOption,
        filters,
        serviceHistory,
        subscribedUsers
      ),
    [filters, currentOption, serviceHistory, subscribedUsers]
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  /* ⭐ Rating Filter */
  const StarRatingFilter = () => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const Icon =
          i <= filters.rating ? STAR_FULL : STAR_EMPTY;

        return (
          <span
            key={i}
            onClick={() =>
              setFilters((p) => ({ ...p, rating: i }))
            }
            className="cursor-pointer text-yellow-400"
          >
            {Icon}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="p-6">
      <ViewCusomterHistory />

      {/* ---------------- Header ---------------- */}
      <div className="mb-6">
        <h1 className="text-3xl font-black">
          Client Management Directory
        </h1>
        <p className="text-slate-500 mt-2">
          Manage customer history and subscriptions.
        </p>
      </div>

      {/* ---------------- Table Container ---------------- */}
      <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--primary-20)] overflow-hidden">

        {/* Table Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b-[var(--primary-20)] bg-[var(--bg-secondary)]">
          <h2 className="text-lg font-bold">All Clients</h2>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              type="text"
              placeholder="Search client"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-[var(--bg-primary)] outline-none px-3 py-2 text-sm rounded-lg border border-[var(--primary-20)] w-full sm:w-[220px]"
            />

            {/* Filter Button */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilters((p) => !p)}
                className="p-2 rounded-lg border border-[var(--primary-20)] hover:bg-[var(--primary-20)]"
              >
                {FILTER_SVG}
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-4 z-50">
                  <p className="text-xs font-bold mb-2">Minimum Rating</p>
                  <StarRatingFilter />
                  <button
                    onClick={() =>
                      setFilters({ name: "", rating: 0 })
                    }
                    className="mt-3 text-xs font-bold text-red-500"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---------------- Table ---------------- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[640px]">
            <thead className="bg-[var(--bg-primary)] text-xs uppercase text-[var(--text-secondary)]">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Service</th>
                {currentOption === "History" && (
                  <th className="px-6 py-4">Price</th>
                )}
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--primary-20)]">
              {paginatedData.map((entry) => (
                <tr
                  key={entry.id}
                  onClick={() => {
                    dispatch(setSelectedUserHistory(entry));
                    dispatch(setCurrentForm(FORMS.VIEW_SERVICE_HISTORY));
                  }}
                  className="hover:bg-[var(--primary-20)] cursor-pointer"
                >
                  <td className="px-6 py-4 font-semibold">
                    {entry.userName || entry.name}
                  </td>
                  <td className="px-6 py-4">
                    {entry.service || entry.subscribedServices?.join(", ")}
                  </td>
                  {entry.price && (
                    <td className="px-6 py-4">${entry.price}</td>
                  )}
                  <td className="px-6 py-4">
                    {format(
                      new Date(entry.date || entry.nextBooking),
                      "MMM d, yyyy"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------------- Pagination ---------------- */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 text-sm border rounded disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 text-sm border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderUsersPage;

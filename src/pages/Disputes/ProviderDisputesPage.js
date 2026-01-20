import React, { useMemo, useState, useEffect } from "react";
import {
  CHECKBOX_SVG,
  EYE_SVG,
  NOTE_STACK_SVG,
  UNDER_REVIEW_SVG,
  WARNING_SVG,
  ARROW_DOWN,
  ARROW_UP,
  FILTER_SVG,
  FILE_DOWNLOAD_SVG,
} from "../../constants";
import StatCard from "../../components/StatCard";
import Dropdown from "../../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getDisputes } from "../../redux/user/apiRequests";
import { FORMS } from '../../components/Forms/FormsContainer';
import { setCurrentForm } from "../../redux/ui/uiSlice";
import { setSelectedDispute } from "../../redux/user/userSlice";

const LOGOS = {
  total_disputes: NOTE_STACK_SVG,
  open_disputes: WARNING_SVG,
  under_review_disputes: UNDER_REVIEW_SVG,
  resolved_disputes: CHECKBOX_SVG,
};

const FILTERS = {
  ALL_STATUSES: "All Statuses",
  OPEN: "Open",
  UNDER_REVIEW: "Under Review",
  RESOLVED: "Resolved",
  ESCALATED: "Escalated",
};

const getStatusColor = (status) => {
  const colors = {
    open: "bg-red-100 text-red-800",
    under_review: "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
    escalated: "bg-purple-100 text-purple-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-200 text-red-900";
    case "medium":
      return "bg-yellow-200 text-yellow-900";
    default:
      return "bg-green-200 text-green-900";
  }
};

// ✅ Reusable Table Component
// Table Component
const DisputesTable = ({ disputes, dispatch, slice = 0 }) => {
  const rows = slice > 0 ? disputes.slice(0, slice) : disputes;

  return (
    <table className="w-full text-left border-separate border-spacing-0 border border-[var(--primary-20)] rounded-xl overflow-hidden">
      <thead>
        <tr className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] bg-[var(--bg-primary)]">
          <th className="px-6 py-4 text-left">Dispute ID</th>
          <th className="px-6 py-4 text-left">Booking Date</th>
          <th className="px-6 py-4 text-left">Customer</th>
          <th className="px-6 py-4 text-left">Dispute Reason</th>
          <th className="px-6 py-4 text-left">Disputed Amount</th>
          <th className="px-6 py-4 text-left">Status</th>
          <th className="px-6 py-4 text-right">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-[var(--primary-20)] bg-[var(--bg-secondary)]">
        {rows.length > 0 ? (
          rows.map((d) => (
            <tr
              key={d.id}
              className="hover:bg-[var(--primary-20)] transition-colors"
            >
              <td className="px-6 py-4 text-sm font-bold text-[var(--text-primary)]">
                {d.id}
              </td>

              <td className="px-6 py-4 text-sm text-[var(--text-primary)]">
                {new Date(d.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                    {d.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {d.customer}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-[var(--text-primary)]">
                {d.category}
              </td>

              <td className="px-6 py-4 text-sm font-bold text-[var(--text-primary)]">
                ${d.amount}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(
                    d.status
                  )}`}
                >
                  {d.status.replace("_", " ").toUpperCase()}
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => {
                    dispatch(setSelectedDispute(d));
                    dispatch(setCurrentForm(FORMS.DISPUTE_MANAGEMENT));
                  }}
                  className="px-4 py-1.5 rounded-lg bg-primary text-[var(--text-primary)] text-xs font-bold transition-all"
                >
                  {EYE_SVG} View
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="py-6 px-4 text-center text-gray-500"
            >
              No disputes found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};


// Page Component
const ProviderDisputesPage = () => {
  const dispatch = useDispatch();
  const disputes = useSelector((state) => state.user.disputes || []);
  const [currentOption, setCurrentOption] = useState("Overview");
  const [currentFilter, setCurrentFilter] = useState(FILTERS.ALL_STATUSES);
  const [displayFilterOptions, setDisplayFilterOptions] = useState(false);

  const DROPDOWN_OPTIONS = Object.entries(FILTERS).map(([key, label]) => ({
    label,
    onClick: () => setCurrentFilter(label),
  }));

  useEffect(() => {
    dispatch(getDisputes());
  }, [dispatch]);

  const filteredDisputes = useMemo(() => {
    if (currentFilter === FILTERS.ALL_STATUSES) return disputes;
    const normalized = currentFilter.toLowerCase().replace(" ", "_");
    return disputes.filter((d) => d.status === normalized);
  }, [disputes, currentFilter]);

  const providerStats = [
    { title: "Total Disputes", value: disputes.length, logo: LOGOS.total_disputes, metric: "12.5% from last month", color: "#4f46e5" },
    { title: "Open", value: disputes.filter(d => d.status === "open").length, logo: LOGOS.open_disputes, metric: "12.5% from last month", color: "#ef4444" },
    { title: "Under Review", value: disputes.filter(d => d.status === "under_review").length, logo: LOGOS.under_review_disputes, metric: "12.5% from last month", color: "#f59e0b" },
    { title: "Resolved", value: disputes.filter(d => d.status === "resolved").length, logo: LOGOS.resolved_disputes, metric: "12.5% from last month", color: "#10b981" },
  ];

  return (
    <div className="h-full p-6 flex flex-col">
      {/* Stats Grid */}
      <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {providerStats.map((card, index) => <StatCard key={index} card={card} />)}
      </div>

      {/* Overview vs All Disputes */}
      <h3 className="font-bold text-lg mb-4">Recent Disputes</h3>
      {currentOption === "Overview" ? (
        <div>
          {/* Title outside the table */}
          <DisputesTable disputes={filteredDisputes} dispatch={dispatch} slice={5} />
        </div>
      ) : (
        <div>
          {/* Dropdown */}
          <div className="w-full mb-2">
            <Dropdown
              itemClassName="bg-[var(--toggle-background)] hover:bg-[var(--bg-color-secondary)]"
              items={DROPDOWN_OPTIONS.filter(option => option.label !== currentFilter)}
              trigger={
                <div className="p-2 rounded-md font-bold flex items-center gap-2 border bg-[var(--component-primary)] cursor-pointer">
                  {currentFilter} {displayFilterOptions ? ARROW_UP : ARROW_DOWN}
                </div>
              }
              isOpen={displayFilterOptions}
              setIsOpen={setDisplayFilterOptions}
            />
          </div>

          {/* Title outside the table */}
          <h3 className="font-bold text-lg mb-2">All Disputes</h3>
          <DisputesTable disputes={filteredDisputes} dispatch={dispatch} />
        </div>
      )}
    </div>
  );
};

export default ProviderDisputesPage;

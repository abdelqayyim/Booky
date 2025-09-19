import React, { useMemo, useState, useEffect } from "react";
import Toggle from "../../components/Toggle";
import {
  CHECKBOX_SVG,
  EYE_SVG,
  NOTE_STACK_SVG,
  UNDER_REVIEW_SVG,
  WARNING_SVG,
  ARROW_DOWN,
  ARROW_UP,
} from "../../constants";
import StatCard from "../../components/StatCard";
import { useDispatch, useSelector } from "react-redux";
import { getDisputes } from "../../redux/user/apiRequests";
import Dropdown from "../../components/Dropdown";

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
const ProdivderDisputesPages = (props) => {
  const dispatch = useDispatch();
  const disputes = useSelector((state) => state.user.disputes);
  const [currentOption, setCurrentOption] = useState("Overview");
  const [displayFilterOptions, setDisplayFilterOptions] = useState(false);

  const options = useMemo(
    () => [
      { title: "Overview", onClick: () => setCurrentOption("Overview") },
      {
        title: "All Disputes",
        onClick: () => setCurrentOption("All Disputes"),
      },
    ],
    []
  );


  const [curerntFilter, setCurrentFilter] = useState(FILTERS.ALL_STATUSES);

  const DROPDOWN_OPTIONS = Object.entries(FILTERS).map(([key, label]) => ({
  label,
  onClick: () => setCurrentFilter(label),
}));

  useEffect(() => {
    dispatch(getDisputes());
  }, [dispatch]);

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-red-100 text-red-800",
      under_review: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      escalated: "bg-purple-100 text-purple-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // ✅ Filtered Disputes based on currentFilter
  const filteredDisputes = useMemo(() => {
    if (curerntFilter === FILTERS.ALL_STATUSES) return disputes;

    const normalized = curerntFilter.toLowerCase().replace(" ", "_");
    return disputes.filter((d) => d.status === normalized);
  }, [disputes, curerntFilter]);

  const providerStats = [
    {
      title: "Total Disputes",
      value: 3,
      logo: LOGOS.total_disputes,
      metric: "12.5% from last month",
      color: "#4f46e5",
    },
    {
      title: "Open",
      value: 4,
      logo: LOGOS.open_disputes,
      metric: "12.5% from last month",
      color: "#ef4444",
    },
    {
      title: "Under Review",
      value: 5,
      logo: LOGOS.under_review_disputes,
      metric: "12.5% from last month",
      color: "#f59e0b",
    },
    {
      title: "Resolved",
      value: 7,
      logo: LOGOS.resolved_disputes,
      metric: "12.5% from last month",
      color: "#10b981",
    },
  ];

  return (
    <div className="h-full pl-[10px] bg-transparent flex flex-col">
      {/* Page Title + Toggle */}
      <div className="flex flex-row items-center w-auto mb-4">
        <h1 className="text-[45px] font-bold">Disputes</h1>

        <div className="flex flex-row items-center ml-2">
          <Toggle
            options={options}
            height="h-[40px]"
            width="w-[220px]"
            currentValue={currentOption}
          />
        </div>
      </div>

      {/* Detail Section */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {currentOption === "Overview" ? (
          <>
            {/* Cards Grid */}
            <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {providerStats.map((card, index) => (
                <StatCard key={index} card={card} />
              ))}
            </div>

            {/* Recent Disputes */}
            <div className="bg-[var(--component-primary)] rounded-lg shadow mt-4">
              <div className="px-6 py-4 border-b border-[var(--bg-color)]">
                <h3 className="text-lg text-[var(--text-primary)] font-bold">
                  Recent Disputes
                </h3>
              </div>
              <div className="divide-y divide-[var(--bg-color)]">
                {disputes.slice(0, 5).map((dispute) => (
                  <div
                    key={dispute.id}
                    className="p-6 hover:bg-[var(--bg-color-secondary)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {dispute.customer}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {dispute.service} - {dispute.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            dispute.status
                          )}`}
                        >
                          {dispute.status.replace("_", " ").toUpperCase()}
                        </span>
                        <button
                          onClick={() => {
                            // Handle view
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {EYE_SVG}
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-[var(--text-primary)]">
                      {dispute.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Dropdown for Filtering by Status */}
            <div className="w-full h-[50px] mb-0">
              <Dropdown
                itemClassName={`bg-[var(--toggle-background)] hover:bg-[var(--bg-color-secondary)]`}
                items={DROPDOWN_OPTIONS.filter(
                  (option) => option.label !== curerntFilter
                )}
                trigger={
                  <div className="p-2 rounded-md font-bold flex flex-row border bg-[var(--component-primary)] cursor-pointer items-center gap-2">
                    {curerntFilter}
                    {displayFilterOptions ? ARROW_UP : ARROW_DOWN}
                  </div>
                }
                isOpen={displayFilterOptions}
                setIsOpen={setDisplayFilterOptions}
              />
            </div>

            {/* Disputes Table */}
            <table className="min-w-full bg-[var(--component-primary)] shadow rounded-md">
              <thead>
                <tr className="bg-[var(--component-primary)] text-left border-b-[var(--bg-color)]">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Priority</th>
                </tr>
              </thead>
                <tbody>
                            {filteredDisputes?.length > 0 ? (
                  filteredDisputes.map((d) => (
                    <tr
                      key={d.id}
                      className="hover:bg-[var(--bg-color-secondary)] cursor-pointer"
                      onClick={() => {
                        // Handle row click
                      }}
                    >
                      <td className="py-3 px-4 font-medium flex items-center gap-2">
                        <span>{d.customer}</span>
                      </td>
                      <td className="py-3 px-4 text-sm">{d.service}</td>
                      <td className="py-3 px-4 text-sm">${d.amount}</td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            d.status
                          )}`}
                        >
                          {d.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(d.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            d.priority === "high"
                              ? "bg-red-200 text-red-900"
                              : d.priority === "medium"
                              ? "bg-yellow-200 text-yellow-900"
                              : "bg-green-200 text-green-900"
                          }`}
                        >
                          {d.priority}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-6 px-4 text-center text-gray-500"
                    >
                      No disputes found for selected status.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ProdivderDisputesPages;

import React, { useState, useEffect, useMemo } from "react";
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

// Outside the component
const filterData = (
  currentOption,
  filters,
  serviceHistory = [],
  subscribedUsers = []
) => {
  const escapeRegExp = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const nameRegex = new RegExp(escapeRegExp(filters.name), "i");

  const historyList = Array.isArray(serviceHistory) ? serviceHistory : [];
  const subscribedList = Array.isArray(subscribedUsers) ? subscribedUsers : [];

  return currentOption === "History"
    ? historyList.filter((entry) => {
        const matchesName = nameRegex.test(entry.userName);
        const matchesRating = entry.rating >= filters.rating;
        const matchesDate =
          (!filters.fromDate ||
            new Date(entry.date) >= new Date(filters.fromDate)) &&
          (!filters.toDate || new Date(entry.date) <= new Date(filters.toDate));
        const matchesService =
          filters.services.length === 0 ||
          filters.services.includes(entry.service);
        return matchesName && matchesRating && matchesDate && matchesService;
      })
    : subscribedList.filter((user) => {
        const matchesName = nameRegex.test(user.name);
        const matchesRating = user.rating >= filters.rating;
        const matchesDate =
          (!filters.fromDate ||
            new Date(user.nextBooking) >= new Date(filters.fromDate)) &&
          (!filters.toDate ||
            new Date(user.nextBooking) <= new Date(filters.toDate));
        const matchesService =
          filters.services.length === 0 ||
          filters.services.every((service) =>
            user.subscribedServices?.includes(service)
          );
        return matchesName && matchesRating && matchesDate && matchesService;
      });
};

const ProviderUsersPage = () => {
  const dispatch = useDispatch();
  const currentUserState = useSelector((state) => state.user);
  const { serviceHistory, subscribedUsers } = currentUserState;
  const [currentOption, setCurrentOption] = useState("");
  const options = useMemo(
    () => [
      { title: "History", onClick: () => setCurrentOption("History") },
      { title: "Subscribed", onClick: () => setCurrentOption("Subscribed") },
    ],
    []
  );
  const [displayFilterOptions, setDisplayFiletOptions] = useState(false);
  const [filters, setFilters] = useState({
    name: "", // For name search
    fromDate: "", // Start date
    toDate: "", // End date
    rating: 0, // Min rating (can be 0.5 steps)
    services: [], // Array of selected services (e.g. ['Haircut', 'Shave'])
  });

  const filteredData = useMemo(() => {
    return filterData(currentOption, filters, serviceHistory, subscribedUsers);
  }, [filters, currentOption, serviceHistory, subscribedUsers]);
  const [nameInput, setNameInput] = useState("");
  const [draftFilters, setDraftFilters] = useState(filters);

  useEffect(() => {
    dispatch(getServiceHistoryAndSubscribers());
  }, [dispatch]);

  useEffect(() => {
    setCurrentOption(options[0].title);
  }, [options]);

  // Derive service types based on current option
  const serviceTypes = useMemo(() => {
    let source = [];

    if (currentOption === "History") {
      source = Array.isArray(serviceHistory)
        ? serviceHistory.map((entry) => entry?.service).filter(Boolean)
        : [];
    } else {
      source = Array.isArray(subscribedUsers)
        ? subscribedUsers.flatMap((user) => user?.subscribedServices || [])
        : [];
    }

    return Array.from(new Set(source));
  }, [currentOption, serviceHistory, subscribedUsers]);

  const StarRatingFilter = ({ filters, setFilters }) => {
    const handleStarClick = (value) => {
      setFilters((prev) => ({ ...prev, rating: value }));
    };

    const renderStars = () => {
      const stars = [];

      for (let i = 1; i <= 5; i++) {
        let starIcon;

        if (i <= Math.floor(filters.rating)) {
          starIcon = STAR_FULL;
        } else if (filters.rating >= i - 0.5) {
          starIcon = STAR_HALF;
        } else {
          starIcon = STAR_EMPTY;
        }

        stars.push(
          <span
            key={i}
            className="cursor-pointer w-6 h-6 text-yellow-300 hover:text-yellow-400"
            onClick={() => handleStarClick(i)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleStarClick(i - 0.5);
            }}
          >
            {starIcon}
          </span>
        );
      }

      return stars;
    };

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Min Rating:</span>
        <div className="flex">{renderStars()}</div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col pl-[10px] pt-[5px] bg-transparent w-full">
      <ViewCusomterHistory />
      {/* Page Title + Toggle + Filter */}
      <div className="flex flex-row items-center w-auto">
        <h1 className="text-[45px] font-bold">Users</h1>

        <div className="flex flex-row items-center ml-2">
          <Toggle
            options={options}
            height="h-[40px]"
            width="w-[220px]"
            currentValue={currentOption}
          />
          <Tooltip title="Filter" placement="bottom">
            <div
              className="ml-2 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer text-[var(--text-primary)] bg-[var(--bg-color-secondary)]"
              onClick={() => setDisplayFiletOptions((prev) => !prev)}
            >
              {FILTER_SVG}
            </div>
          </Tooltip>
        </div>
      </div>

      {displayFilterOptions && (
        <div className="text-[var(--text-primary)] p-4 shadow-md mb-6 flex flex-col gap-4   bg-[var(--component-primary)] rounded-[10px]">
          {/* Search by Name */}
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDraftFilters({ ...filters, name: nameInput });
              }
            }}
            className="px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-[var(--text-primary)]  outline-none bg-[var(--bg-color-secondary)]"
            placeholder="Search By Name"
          />

          {/* Date Range Filter + Rating */}
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) =>
                setDraftFilters({ ...filters, fromDate: e.target.value })
              }
              className="px-3 py-2  rounded-lg focus:ring-2 focus:ring-blue-500 text-[var(--text-primary)] bg-[var(--bg-color-secondary)]"
            />
            <span className="text-black">to</span>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) =>
                setDraftFilters({ ...filters, toDate: e.target.value })
              }
              className="px-3 py-2  rounded-lg focus:ring-2 focus:ring-blue-500 text-[var(--text-primary)] bg-[var(--bg-color-secondary)]"
            />

            {/* Rating Filter (assumes you have StarRatingFilter inside this file) */}
            {currentOption === "History" && (
              <StarRatingFilter
                filters={draftFilters}
                setFilters={setDraftFilters}
              />
            )}
          </div>

          {/* Services Selection */}
          <div className="flex flex-wrap gap-2">
            {serviceTypes.map((service) => {
              const isSelected = draftFilters.services.includes(service);

              return (
                <button
                  key={service}
                  type="button"
                  className={`px-4 py-2 rounded-lg text-sm  text-[var(--text-primary)] ${
                    isSelected
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--bg-color-secondary)]  hover:bg-[var(--text-secondary)]"
                  }`}
                  onClick={() => {
                    setDraftFilters((prev) => ({
                      ...prev,
                      services: isSelected
                        ? prev.services.filter((s) => s !== service)
                        : [...prev.services, service],
                    }));
                  }}
                >
                  {service}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex flex-row gap-2 mt-2">
            <button
              type="button"
              className="w-fit px-4 py-2 rounded-lg border flex items-center gap-2 text-black bg-gray-100 hover:bg-gray-200"
              onClick={() => {
                const reset = {
                  name: "",
                  fromDate: "",
                  toDate: "",
                  rating: 0,
                  services: [],
                };
                setFilters(reset);
                setDraftFilters(reset);
                setNameInput("");
                setDisplayFiletOptions((prev) => !prev);
              }}
            >
              Reset
            </button>
            <button
              type="button"
              className="w-fit px-4 py-2 rounded-lg border flex items-center gap-2 bg-[var(--primary)] text-white"
              onClick={() => {
                setFilters(draftFilters);
                setDisplayFiletOptions((prev) => !prev);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="w-full mr-[10px] overflow-x-auto">
        <table className="min-w-full bg-[var(--component-primary)] shadow rounded-md">
          <thead>
            <tr className="bg-[var(--component-primary)] text-left border-b">
              <th className="py-3 px-4">Name</th>
              {/* <th className="py-3 px-4">Email / Phone</th> */}
              <th className="py-3 px-4">Service</th>
              {currentOption === "History" && (
                <th className="py-3 px-4">Price</th>
              )}

              <th className="py-3 px-4">
                {currentOption === "History"
                  ? "Date of Service"
                  : "Next Scheduled Booking"}
              </th>
              {currentOption === "History" && (
                <th className="py-3 px-4">Rating</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((entry) =>
                currentOption === "History" ? (
                  <tr
                    key={entry.id}
                    className=" hover:bg-[var(--bg-color-secondary)]"
                    onClick={() => {
                      dispatch(setSelectedUserHistory(entry));
                      dispatch(setCurrentForm(FORMS.VIEW_SERVICE_HISTORY));
                    }}
                  >
                    <td className="py-3 px-4 font-medium">{entry.userName}</td>
                    {/* <td className="py-3 px-4 text-sm">
                      <div>{entry.email}</div>
                      <div className="text-gray-500">{entry.phone}</div>
                    </td> */}
                    <td className="py-3 px-4 text-sm">{entry.service}</td>
                    <td className="py-3 px-4 text-sm">{entry.price}</td>
                    <td className="py-3 px-4 text-sm">
                      {format(new Date(entry.date), "MMM d, yyyy")}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded">
                        {entry.rating} ★
                      </span>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={entry.id}
                    className="hover:bg-[var(--bg-color-secondary)]"
                    onClick={() => {
                      dispatch(setSelectedUserSubscribed(entry));
                      dispatch(setCurrentForm(FORMS.VIEW_SUBSCRIBED_USER));
                    }}
                  >
                    <td className="py-3 px-4 font-medium">{entry.name}</td>

                    <td className="py-3 px-4 text-sm">
                      <div className="flex flex-wrap gap-2">
                        {entry.subscribedServices?.length > 0 ? (
                          entry.subscribedServices.map((service, index) => (
                            <span
                              key={index}
                              className="bg-[var(--bg-color)] text-[var(--text-primary)] text-xs font-medium px-3 py-1 rounded-full"
                            >
                              {service}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No Subscriptions
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {format(new Date(entry.nextBooking), "MMM d, yyyy")}
                    </td>
                    {/* <td className="py-3 px-4">
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded">
                        {entry.rating} ★
                      </span>
                    </td> */}
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={5} className="py-6 px-4 text-center text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderUsersPage;

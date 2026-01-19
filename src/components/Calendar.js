import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addWeeks,
  subWeeks,
  addYears,
  subYears,
  subDays,
  addMonths,
  subMonths,
} from "date-fns";
import DayView from "./Calendar/DayView";
import WeekView from "./Calendar/WeekView";
import AppointmentCard from "./AppointmentCard";
import MonthView from "./Calendar/MonthView";
import YearView from "./Calendar/YearView.js";
import Dropdown from "./Dropdown.js";
import OverrideSchedule from "./Calendar/OverrideSchedule.js";
import {
  ARROW_UP,
  ARROW_DOWN,
  EDIT_BUTTON,
  ADD_BUTTON,
} from "../constants.js";
import Tooltip from "@mui/material/Tooltip";
import CustomButton from "./CustomButton.js";
import { FORMS } from "../components/Forms/FormsContainer.js";
import { setCurrentForm,setCurrentDate } from "../redux/ui/uiSlice.js";
import {
  CALENDAR_VIEWS,
  filterAppointmentsByView,
} from "../redux/user/userSlice.js";
import Toggle from "./Toggle.js";

function Calendar() {
  const OPTIONS = {
    BOOKINGS: "Bookings",
    // Bookings: "Bookings",
    SCHEDULE: "Schedule",
  };

  const dispatch = useDispatch();
  const currentDateString = useSelector((state) => state.ui.currentDate);
  const currentDate = useMemo(() => new Date(currentDateString), [currentDateString]);
  const [currentOption, setCurrentOption] = useState(OPTIONS.BOOKINGS);
  const [currentCalendarView, setCurrentCalendarView] = useState(
    CALENDAR_VIEWS.DAY
  );

  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
  });
  const [openCalendarViewOptions, setOpenCalendarViewOptions] = useState(false);
  const [isDefaultOpen, setIsDefaultOpen] = useState(true);
  // const [openOverrides, setOpenOverrides] = useState({}); // key: weekStartDate, value: boolean

  const appointments = useSelector((state) => state.user?.appointments || []);
  const schedules = useSelector((state) => ({
    default: state.user.defaultSchedule,
    overrideSchedule: state.user.overrideSchedule,
  }));

  const allViews = [
    { label: "DAY", value: CALENDAR_VIEWS.DAY },
    { label: "WEEK", value: CALENDAR_VIEWS.WEEK },
    { label: "MONTH", value: CALENDAR_VIEWS.MONTH },
    { label: "YEAR", value: CALENDAR_VIEWS.YEAR },
    { label: "SCHEDULE", value: CALENDAR_VIEWS.SCHEDULE },
  ];

  const VIEWS = allViews
    .filter((view) => view.value !== currentCalendarView)
    .map((view) => ({
      label: view.label,
      onClick: () => setCurrentCalendarView(view.value),
    }));

  const handleCreateEvent = () => {
    dispatch(setCurrentForm(FORMS.CREATE_EVENT));
  };

  // Toggle component for switching between options
  const renderToggle = (options, height, width, currentValue) => (
    <Toggle height={height} options={options} width={width} currentValue={currentValue}/>
  );

  // Navigation functions
  const navigateNext = () => {
    switch (currentCalendarView) {
      case CALENDAR_VIEWS.DAY:
        dispatch(setCurrentDate(addDays(currentDate, 1).toISOString()));
        break;
      case CALENDAR_VIEWS.WEEK:
        dispatch(setCurrentDate(addWeeks(currentDate, 1).toISOString()));
        break;
      case CALENDAR_VIEWS.MONTH:
        dispatch(setCurrentDate(addMonths(currentDate, 1).toISOString()));
        break;
      case CALENDAR_VIEWS.YEAR:
        dispatch(setCurrentDate(addYears(currentDate, 1).toISOString()));
        break;
      default:
        break;
    }
  };

  const navigatePrev = () => {
    switch (currentCalendarView) {
      case CALENDAR_VIEWS.DAY:
        const prevDay = subDays(currentDate, 1);
        dispatch(setCurrentDate(prevDay.toISOString()));
        break;
      case CALENDAR_VIEWS.WEEK:
        const prevWeek = subWeeks(currentDate, 1);
        dispatch(setCurrentDate(prevWeek.toISOString()));
        break;
      case CALENDAR_VIEWS.MONTH:
        dispatch(setCurrentDate(subMonths(currentDate, 1).toISOString()));
        break;
      case CALENDAR_VIEWS.YEAR:
        dispatch(setCurrentDate(subYears(currentDate, 1).toISOString()));
        break;
      default:
        break;
    }
  };

  const handleEditSchedule = (weekStartDate) => {
    if (weekStartDate === null) {
      // Editing the default schedule
      console.log("Edit default schedule");
    } else {
      console.log("Edit override schedule for week:", weekStartDate);
    }

    // Set state to open edit modal/form
  };

  const navigateToday = () => {
    dispatch(setCurrentDate(new Date().toISOString()));
  };
  const renderHeaderTitle = () => {
    let headerTitle = "";
    switch (currentCalendarView) {
      case CALENDAR_VIEWS.DAY:
        headerTitle = format(currentDate, 'EEEE, MMMM d-yyyy');
        break;
      case CALENDAR_VIEWS.WEEK:
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        headerTitle = `${format(weekStart, "MMM d")} - ${format(
          weekEnd,
          "MMM d, yyyy"
        )}`;
        break;
      case CALENDAR_VIEWS.MONTH:
        headerTitle = `${format(currentDate, "MMMM yyyy")}`;
        break;
      case CALENDAR_VIEWS.YEAR:
        headerTitle = format(currentDate, "yyyy");
        break;
      default:
        headerTitle = format(currentDate, "MMMM yyyy");
    }
    return headerTitle;
  };

  // Header component with navigation controls
  const renderHeader = () => {
    let headerTitle = renderHeaderTitle();

    return (
      <div className="flex justify-between items-center p-4 bg-[var(--component-primary)]">
        <div className="flex flex-row ">
          <div
            onClick={navigateToday}
            className={`p-1 flex flex-row justify-center bg-[var(--toggle-background)] flex-1 rounded-xl 
              mx-[5px]`}
          >
            <div
              className={`w-fit h-fit px-2 py-1 flex flex-col items-center justify-center font-semibold bg-[var(--toggle-button-background)] shadow-md rounded-xl cursor-pointer`}
            >
              Today
            </div>
          </div>

          <div
            className={`p-1 flex flex-row justify-center bg-[var(--toggle-background)] rounded-xl mx-[5px]`}
          >
            <button
              onClick={navigatePrev}
              className="text-xl font-bold  border-none w-10 bg-[var(--toggle-button-background)] shadow-md rounded-xl mr-1"
            >
              ←
            </button>
            <button
              onClick={navigateNext}
              className="text-xl font-bold border-none w-10 bg-[var(--toggle-button-background)] shadow-md rounded-xl"
            >
              →
            </button>
          </div>
        </div>

        <div>
          <span className="text-lg font-semibold">{headerTitle}</span>
        </div>

        <div className="flex flex-row items-center justify-center">
          <CustomButton
            icon={ADD_BUTTON}
            onClick={handleCreateEvent}
            tooltipTitle="Add"
            tooltipPlacement="bottom"
            colorScheme="primary"
            height="35px"
            width="45px"
          />

          <Dropdown
            itemClassName={`bg-[var(--toggle-background)] hover:bg-[var(--bg-color-secondary)]`}
            items={VIEWS}
            trigger={
              <div
                className={`cursor-pointer p-1 flex flex-row justify-center bg-[var(--toggle-background)] flex-1 rounded-xl 
                mx-[5px]`}
              >
                <div
                  className={`w-fit h-fit px-2 py-1 flex flex-col items-center justify-center font-semibold bg-[var(--toggle-button-background)] shadow-md rounded-xl`}
                >
                  {currentCalendarView}
                </div>
              </div>
            }
            isOpen={openCalendarViewOptions}
            setIsOpen={setOpenCalendarViewOptions}
          />
        </div>
      </div>
    );
  };

  // Render schedule view
  const renderScheduleView = () => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return (
      <div className="mt-4">
        <div className="text-lg font-semibold mb-4">Weekly Schedule</div>
        <div className="space-y-2">
          {daysOfWeek.map((day) => {
            const daySchedule = schedules.find((s) => s.day === day);

            return (
              <div
                key={day}
                className="flex items-center p-3 rounded-lg bg-[var(--bg-color)] shadow-sm"
              >
                <div className="w-24 font-medium">{day}</div>
                {daySchedule ? (
                  <div className="flex-1 flex justify-between items-center">
                    <div className="text-[var(--text-secondary)]">
                      {daySchedule.startTime} - {daySchedule.endTime}
                    </div>
                    <div className="text-sm bg-[var(--primary)] text-white px-2 py-1 rounded">
                      {daySchedule.startTime === "Closed" ? "Closed" : "Open"}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 text-[var(--text-secondary)]">
                    Closed
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const filteredAppointments = useMemo(
    () =>
      filterAppointmentsByView(currentCalendarView, currentDate, appointments),
    [currentCalendarView, currentDate, appointments]
  );

  // Render Calendar View
  const renderCalendarView = () => {
    switch (currentCalendarView) {
      case CALENDAR_VIEWS.MONTH:
        return (
          <MonthView/>
        );
      case CALENDAR_VIEWS.DAY:
        return (
          <div className="px-4 overflow-y-scroll hide-scrollbar h-full">
            <DayView />
          </div>
        );
      case CALENDAR_VIEWS.WEEK:
        return (
          <div className="p-4 overflow-y-scroll hide-scrollbar h-full">
            <WeekView/>
          </div>
        );
      case CALENDAR_VIEWS.YEAR:
        return (
          <div className="p-4 overflow-y-scroll hide-scrollbar h-full">
            <YearView
              setCurrentCalendarView={setCurrentCalendarView}
            />
          </div>
        );
      case CALENDAR_VIEWS.SCHEDULE:
        return <div className="p-4">{renderScheduleView()}</div>;
      default:
        return null;
    }
  };

  // Option toggles
  const TAB_OPTIONS = Object.values(OPTIONS).map((option) => ({
    title: option,
    onClick: () => {
      setCurrentOption(option);
      setIsAddingSchedule(false);
    },
  }));

  // Schedule management handlers
  const handleAddSchedule = () => {
    setIsAddingSchedule(true);
  };

  const handleScheduleChange = (field, value) => {
    setNewSchedule((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSchedule = () => {
    // In a real app, you would save this to your backend
    setIsAddingSchedule(false);
  };

  return (
    <div className="h-full w-full flex flex-row relative">
      <div className="relative bg-[var(--component-primary)] w-[500px] mr-2 rounded-md overflow-y-scroll hide-scrollbar">
        <div className="sticky top-0 z-10 bg-[var(--component-primary)] pt-[10px]">
          {renderToggle(TAB_OPTIONS, "h-[40px]", "", currentOption)}
        </div>

        <div className="p-4">
          {currentOption === OPTIONS.BOOKINGS && (
            <div className="">
              <h2 className="flex flex-row justify-center sticky top-[50px] z-10 bg-[var(--component-primary)] text-lg font-semibold mb-4 px-4 pt-2 pb-2">
                {renderHeaderTitle()}
              </h2>

              {filteredAppointments.length === 0 ? (
                <div className="text-center py-6 text-[var(--text-secondary)]">
                  No appointments for this {currentCalendarView}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      bgColor={"bg-[var(--bg-color)]"}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {currentOption === OPTIONS.SCHEDULE && !isAddingSchedule && (
            <div className="mt-4">
              {/* Default Schedule Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Default Schedule</h2>
                <div className="flex gap-2">
                  <Tooltip
                    title={isDefaultOpen ? "Close" : "Expand"}
                    placement="bottom"
                  >
                    <button
                      onClick={() => setIsDefaultOpen(!isDefaultOpen)}
                      className="text-sm px-2 py-1 rounded-md bg-[var(--toggle-background)] hover:bg-gray-200 text-[var(--text-primary)]"
                    >
                      <div>{isDefaultOpen ? ARROW_UP : ARROW_DOWN}</div>
                    </button>
                  </Tooltip>
                  <Tooltip title="Edit" placement="bottom">
                    <button
                      onClick={() => handleEditSchedule(null)}
                      className="bg-[var(--toggle-background)] text-sm text-[var(--text-primary)] px-3 py-1 rounded-md"
                    >
                      {EDIT_BUTTON}
                    </button>
                  </Tooltip>
                  <Tooltip title="Add" placement="bottom">
                    <button
                      onClick={handleAddSchedule}
                      className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-3 py-1 rounded-md text-sm"
                    >
                      {ADD_BUTTON}
                    </button>
                  </Tooltip>
                </div>
              </div>

              {/* Default Schedule Display */}
              {isDefaultOpen && (
                <div className="space-y-2">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ]?.map((day) => {
                    const blocks = schedules.default?.days[day] || [];
                    return (
                      <div
                        key={day}
                        className="p-3 rounded-lg bg-[var(--bg-color)] shadow-sm"
                      >
                        <div className="font-medium mb-1">{day}</div>
                        {blocks.length > 0 ? (
                          <div className="space-y-1">
                            {blocks.map((block, idx) => (
                              <div
                                key={idx}
                                className="text-sm text-[var(--text-secondary)]"
                              >
                                {block.startTime} - {block.endTime}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-[var(--text-secondary)] italic">
                            No hours
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Override Schedules */}
              <div>
                <div className="my-2 font-bold">You Overrides</div>
                {schedules.overrideSchedule?.map((override, i) => (
                  <OverrideSchedule
                    key={override.weekStartDate}
                    weekStartDate={override.weekStartDate}
                    days={override.days}
                  />
                ))}
              </div>
            </div>
          )}

          {currentOption === OPTIONS.SCHEDULE && isAddingSchedule && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-4">Add New Schedule</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Day</label>
                  <select
                    value={newSchedule.day}
                    onChange={(e) =>
                      handleScheduleChange("day", e.target.value)
                    }
                    className="w-full p-2 border rounded-md bg-[var(--bg-color)]"
                  >
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Time
                  </label>
                  <select
                    value={newSchedule.startTime}
                    onChange={(e) =>
                      handleScheduleChange("startTime", e.target.value)
                    }
                    className="w-full p-2 border rounded-md bg-[var(--bg-color)]"
                  >
                    {[
                      "08:00 AM",
                      "09:00 AM",
                      "10:00 AM",
                      "11:00 AM",
                      "12:00 PM",
                      "01:00 PM",
                      "02:00 PM",
                    ].map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Time
                  </label>
                  <select
                    value={newSchedule.endTime}
                    onChange={(e) =>
                      handleScheduleChange("endTime", e.target.value)
                    }
                    className="w-full p-2 border rounded-md bg-[var(--bg-color)]"
                  >
                    {[
                      "03:00 PM",
                      "04:00 PM",
                      "05:00 PM",
                      "06:00 PM",
                      "07:00 PM",
                      "08:00 PM",
                      "09:00 PM",
                    ].map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setIsAddingSchedule(false)}
                    className="px-4 py-2 border rounded-md text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSchedule}
                    className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-4 py-2 rounded-md text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col h-full w-full rounded-md overflow-hidden bg-[var(--component-primary)]">
        {renderHeader()}
        {renderCalendarView()}
      </div>
    </div>
  );
}

export default Calendar;

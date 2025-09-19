import React from "react";
import PopUpFormSkeleton from "./PopUpFormSkeleton";
import {
  DOLLAR_SIGN_SVG,
  REPAIR_SVG,
  MAIL_SVG,
  PHONE_SVG,
  CALENDAR_SVG,
} from "../../constants";
import { setSelectedUserSubscribed } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const ViewSuscribedCustomer = ({ data }) => {
  const dispatch = useDispatch();
  // Define styles per status
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const fillSection = (
    icon,
    key,
    value,
    boldKey = false,
    boldValue = false,
    isStatus = false
  ) => {
    return (
      <div className="flex flex-row gap-2">
        {icon && <div className="flex items-center">{icon}</div>}
        <div className="flex flex-col">
          <div
            className={`${
              boldKey ? "font-bold" : "text-[var(--text-secondary)]"
            } text-md`}
          >
            {key}
          </div>
          <div className="text-md">
            {isStatus ? (
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  statusStyles[value.toLowerCase()] || ""
                }`}
              >
                {value}
              </span>
            ) : (
              <span
                className={`${
                  boldValue
                    ? "font-bold text-[var(--text-primary)]"
                    : "text-[var(--text-primary)]"
                }`}
              >
                {value}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <PopUpFormSkeleton
      formTitle="Service Subscrier Detail"
      onClose={() => dispatch(setSelectedUserSubscribed(undefined))}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          {fillSection(
            <div className="text-blue-500">{MAIL_SVG}</div>,
            "Email",
            data?.email,
            false,
            true
          )}
          {fillSection(
            <div className="text-green-500">{PHONE_SVG}</div>,
            "Phone",
            data?.phone,
            false,
            true
          )}
        </div>
        <div className="flex flex-row gap-2 items-start">
          <div className="text-purple-500 mt-1">{REPAIR_SVG}</div>
          <div className="flex flex-col">
            <div className="text-[var(--text-secondary)] text-md">Services</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {data?.subscribedServices?.length > 0 ? (
                data.subscribedServices.map((service, index) => (
                  <span
                    key={index}
                    className="bg-[var(--bg-color)] text-[var(--text-primary)] text-sm px-3 py-1 rounded-full font-semibold"
                  >
                    {service}
                  </span>
                ))
              ) : (
                <span className="text-[var(--text-secondary)] text-sm">
                  No Subscriptions
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </PopUpFormSkeleton>
  );
};

export default ViewSuscribedCustomer;

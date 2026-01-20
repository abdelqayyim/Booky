import React, { useState } from "react";
import {
  ADD_BUTTON,
  BANK_SVG,
  CAMERA_SVG,
  CHECKMARK_SVG,
  DELETE_SVG,
  MAIL_SVG,
  PAYMENT_SVG,
  PHONE_SVG,
  USER_SVG,
} from "../../constants";

/* ---------- Reusable Components ---------- */
const PaymentCardDisplay = () => (
  <div className="relative h-[280px] w-full max-w-[440px] mx-auto mb-8">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl -translate-y-8 scale-90 opacity-40 blur-[1px]"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-accent-gold rounded-2xl -translate-y-4 scale-95 opacity-80 shadow-lg"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-br from-slate-800 to-black rounded-2xl shadow-2xl z-10 p-8 text-white flex flex-col justify-between overflow-hidden">
      <div className="absolute -right-16 -top-16 size-64 bg-white/5 rounded-full"></div>
      <div className="absolute -left-12 -bottom-12 size-40 bg-primary/10 rounded-full"></div>

      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Current Balance</p>
          <p className="text-2xl font-black">$4,250.00</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex -space-x-3 mb-1">
            <div className="size-8 rounded-full bg-red-500/80"></div>
            <div className="size-8 rounded-full bg-yellow-500/80"></div>
          </div>
          <p className="text-[10px] font-bold">Mastercard</p>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-xl tracking-[0.25em] font-medium mb-6">•••• •••• •••• 8842</p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Card Holder</p>
            <p className="text-sm font-bold uppercase tracking-wider">Alex Rivera</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Expires</p>
            <p className="text-sm font-bold">12/26</p>
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-center mt-4 gap-2">
      <span className="size-2 rounded-full bg-primary"></span>
      <span className="size-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
      <span className="size-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
    </div>
  </div>
);

const InputField = ({ label, value, disabled = true, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      disabled={disabled}
      className="w-full h-[40px] border rounded bg-[var(--bg-primary)] border-[var(--primary-20)] px-2 outline-none"
    />
  </div>
);

const SelectField = ({ label, options, disabled = true }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">{label}</label>
    <select
      disabled={disabled}
      className="outline-none form-select text-sm rounded-lg border border-[var(--primary-20)] bg-[var(--bg-primary)] focus:ring-[var(--primary)] focus:border-[var(--primary)] min-w-[140px] px-3 py-2"
    >
      {options.map((opt, idx) => (
        <option key={idx}>{opt}</option>
      ))}
    </select>
  </div>
);

const InfoRow = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-gray-600">
    <span className="material-symbols-outlined text-gray-400">{icon}</span>
    <span className="text-sm">{text}</span>
  </div>
);

const TabButton = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`py-5 text-sm font-bold tracking-wide flex items-center gap-2 ${
      active
        ? "text-primary border-b-2 border-[var(--primary)]"
        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
    }`}
  >
    <span className="material-symbols-outlined text-xl">{icon}</span>
    {label}
  </button>
);

const BankAccountCard = ({ name, last4, status, statusColor }) => (
  <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--primary-20)]">
    <div className="flex items-center gap-4">
      <div className="size-12 rounded-lg bg-[var(--bg-primary)] flex items-center justify-center shadow-sm border border-[var(--primary-20)]">
        <span className="material-symbols-outlined text-primary">{BANK_SVG}</span>
      </div>
      <div>
        <p className="font-bold dark:text-white text-sm">{name}</p>
        <p className="text-xs text-gray-500 uppercase tracking-wider">•••• {last4}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span
        className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${
          statusColor === "green"
            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
            : "bg-gray-200 dark:bg-gray-700 text-gray-500"
        }`}
      >
        {status}
      </span>
      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
        <span className="material-symbols-outlined">{DELETE_SVG}</span>
      </button>
    </div>
  </div>
);

/* ---------- Main Component ---------- */
const ProvideSettingsPage = () => {
  const tabs = {
    personal: { label: "Personal Information", value: "personal", icon: USER_SVG },
    payments: { label: "Payment Methods", value: "payment", icon: PAYMENT_SVG },
  };

  const [activeTab, setActiveTab] = useState("personal");

  const personalFields = [
    { label: "First Name", value: "Abdel Qayyim" },
    { label: "Last Name", value: "Yahaya" },
    { label: "Email", value: "jack@gmail.com", type: "email" },
    { label: "Phone Number", value: "+1 416 123 4567", type: "tel" },
  ];

  const businessFields = [
    {
      label: "Timezone",
      options: ["(GMT-05:00) Eastern Time", "(GMT-08:00) Pacific Time"],
    },
    { label: "Country", options: ["United States", "Canada"] },
    {
      label: "Business Address",
      value: "23 Property Plaza, Suite 400 New York, NY 10001",
    },
  ];

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
          User Profile Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your professional identity, payment flows, and connectivity preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left — Profile */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-sm border border-[var(--primary-20)] text-center">
            <div className="relative inline-block mb-6">
              <div
                className="size-40 rounded-full bg-cover bg-center border-4 border-[var(--primary-20)] shadow-xl"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzd5jFY5MvafFLFXNEcUVL-JD3hQwlg512mdiZyJRl3RJcCQvupJg5ypmhnwfvWVeQ9nsiQQNJ2LUlcywBbZcsl0uNWVG3O_elT9-P0E3bKMkMRR_5EDUGHGoYtjKjR6pHIMDQTZkKjN94tU4YAiARiyT6z6hP1_fjhp2qFnkyxhNIZ-6KdeX29FRemRFOBoNd2hqogJxgMLzGKSS-oqqfEAyqExi5ZxzqJUAqwhkAxayYoN5pXmoR439lfn2Lg8LkMrM6fvz9tpY')",
                }}
              />
              <button className="absolute bottom-1 right-1 size-10 bg-primary text-[var(--bg-secondary)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">{CAMERA_SVG}</span>
              </button>
            </div>

            <h3 className="text-2xl font-bold dark:text-white">Alex Rivera</h3>
            <p className="text-primary font-semibold text-sm">Senior Property Manager</p>

            <div className="mt-8 pt-8 border-t border-[var(--primary-20)] flex flex-col gap-4 text-left">
              <InfoRow icon={MAIL_SVG} text="alex.rivera@servicedash.com" />
              <InfoRow icon={PHONE_SVG} text="+1 (555) 012-3456" />
            </div>
          </div>
        </div>

        {/* Right — Tabs */}
        <div className="lg:col-span-8">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-[var(--primary-20)] flex flex-col h-full">
            {/* Tabs */}
            <div className="px-8 border-b border-[var(--primary-20)] dark:border-gray-800">
              <div className="flex gap-8">
                {Object.values(tabs).map((tab) => (
                  <TabButton
                    key={tab.value}
                    active={activeTab === tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    icon={tab.icon}
                    label={tab.label}
                  />
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8 flex-1">
              {activeTab === "personal" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {personalFields.map((f) => (
                      <InputField key={f.label} {...f} />
                    ))}
                  </div>

                  <div className="pt-6 border-t border-[var(--primary-20)] space-y-6">
                    <h4 className="text-base font-bold mb-4 text-[var(--text-primary)]">Business Location</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {businessFields.map((f) =>
                        f.options ? (
                          <SelectField key={f.label} {...f} />
                        ) : (
                          <InputField key={f.label} {...f} />
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "payment" && (
                <div className="space-y-8">
                  <PaymentCardDisplay />
                  {/* Linked Bank Accounts */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold dark:text-white">Linked Bank Accounts</h4>
                      <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-lg">{ADD_BUTTON}</span>
                        Link Account
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <BankAccountCard
                        name="Chase Business Checking"
                        last4="9901"
                        status="Verified"
                        statusColor="green"
                      />
                      <BankAccountCard
                        name="Bank of America Savings"
                        last4="4423"
                        status="Inactive"
                        statusColor="gray"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-[var(--bg-primary)] rounded-b-xl border-t border-[var(--primary-20)] flex justify-end gap-4">
              <button className="px-6 py-2.5 rounded-lg font-bold text[var(--text-secondary)] hover:bg-gray-200 transition-colors">
                Discard Changes
              </button>
              <button className="px-8 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--bg-secondary)] font-bold hover:bg-primary/90 shadow-md shadow-primary/20 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">{CHECKMARK_SVG}</span>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvideSettingsPage;

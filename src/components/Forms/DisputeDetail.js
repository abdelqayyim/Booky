import React from "react";
import PopUpFormSkeleton from "./PopUpFormSkeleton";
import { useDispatch } from "react-redux";
import { setSelectedDispute } from "../../redux/user/userSlice";
import { CALENDAR_SVG, DOLLAR_SIGN_SVG, PAPERCLIP_SVG, USER_SVG } from "../../constants";

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-red-100 text-red-800",
      under_review: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      escalated: "bg-purple-100 text-purple-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };
const DisputeDetail = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <PopUpFormSkeleton
      formTitle="Disputes Management"
      onClose={() => dispatch(setSelectedDispute(undefined))}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Dispute Header */}
        <div className="bg-[var(--bg-color)] rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Dispute {data?.id}</h2>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data?.status)}`}>
              {data?.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-3">
                {USER_SVG}
              <div>
                <p className="text-sm text-[var(--text-secondary)] ">Customer</p>
                <p className="font-medium text-[var(--text-primary)] ">{data?.customer}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
                {CALENDAR_SVG}
              <div>
                <p className="text-sm text-[var(--text-secondary)] ">Service Date</p>
                <p className="font-medium text-[var(--text-primary)]">{data?.serviceDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
                {DOLLAR_SIGN_SVG}
              <div>
                <p className="text-sm text-[var(--text-secondary)] ">Amount</p>
                <p className="font-medium text-[var(--text-primary)]">${data?.amount}</p>
              </div>
            </div>
          </div>
          
          <p className="text-[var(--text-primary)] ">{data?.description}</p>
        </div>

        {/* Messages */}
        <div className="bg-[var(--bg-color)] rounded-lg shadow">
          <div className="px-6 py-4 border-b ">
            <h3 className="text-lg font-medium text-[var(--text-primary)]">Communication</h3>
          </div>
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {data?.messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'provider' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  {message.attachments && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          {PAPERCLIP_SVG}
                          <span>{file}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs opacity-75 mt-1">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="px-6 py-4 border-t ">
            <div className="flex space-x-3">
              <input
                type="text"
                // value={newMessage}
                // onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your response..."
                className="flex-1 px-3 py-2 border bg-[var(--bg-color)]  rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                // onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="px-3 py-2 border rounded-md hover:bg-gray-50">
                  {PAPERCLIP_SVG}
              </button>
              <button
                // onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {/* <Send className="h-4 w-4" /> */}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6 flex flex-col justify-between">
        {/* Quick Actions */}
        <div className="bg-[var(--bg-color)] rounded-lg shadow  p-6">
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              // onClick={() => handleQuickAction('accept_refund', data)}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Accept Full Refund
            </button>
            <button
              // onClick={() => handleQuickAction('partial_refund', data)}
              className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              Offer Partial Refund
            </button>
            <button
              // onClick={() => handleQuickAction('decline', data)}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Decline Dispute
            </button>
            <button
              // onClick={() => handleQuickAction('escalate', data)}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              Escalate to Support
            </button>
          </div>
        </div>

        {/* Dispute Info */}
        <div className="bg-[var(--bg-color)] rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-[var(--text-primary)]  mb-4">Dispute Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-[var(--text-secondary)]">Created:</span>
              <p className="font-medium text-[var(--text-primary)]">{new Date(data?.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Last Update:</span>
              <p className="font-medium text-[var(--text-primary)]">{new Date(data?.lastUpdate).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Category:</span>
              <p className="font-medium text-[var(--text-primary)]">{data?.category}</p>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Priority:</span>
              <div className="flex items-center space-x-2">
                {/* <AlertTriangle className={`h-4 w-4 ${getPriorityColor(data?.priority)}`} /> */}
                <span className="font-medium capitalize">{data?.priority}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PopUpFormSkeleton>
  );
};

export default DisputeDetail;

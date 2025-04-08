import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const SMSModal = ({
  isOpen,
  onClose,
  recipients,
  selectedRecipients,
  handleRecipientSelect,
  handleSendMessages,
  isSending,
  sendStatus,
  selectedMeetingDetails, // Meeting details to be sent
}) => {
  if (!isOpen) return null;

  // New: Store selected phone numbers in a variable
  const selectedPhoneNumbers = Array.from(selectedRecipients);
  // console.log(selectedPhoneNumbers)


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract selected phone numbers
    const selectedPhoneNumbers = [...selectedRecipients]; // Convert Set to array

    if (!selectedPhoneNumbers.length) {
      alert("Please select at least one recipient.");
      return;
    }
    // console.log(selectedMeetingDetails.time)
    // Prepare the payload
    const payload = {
      recipients: selectedPhoneNumbers, // Only phone numbers
      meetingDetails: selectedMeetingDetails, // Meeting details object
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5001/api/sms",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );
      // Add this before the axios call
      console.log("Token being sent:", token);
      // Check if token exists and isn't expired
      // alert(data.message); // Show success message
      alert("Messages sent successfully!");
      onClose(); // Close the modal after sending
    } catch (error) {
      console.error("Full error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };
  const allSelected = recipients.length > 0 &&
    recipients.every(recipient => selectedRecipients.has(recipient.phoneNumber));

  const toggleSelectAll = () => {
    const newSelected = new Set(selectedRecipients);

    if (allSelected) {
      // Unselect all
      recipients.forEach(recipient => newSelected.delete(recipient.phoneNumber));
    } else {
      // Select all
      recipients.forEach(recipient => newSelected.add(recipient.phoneNumber));
    }

    // Update state using existing handler for each phone number
    recipients.forEach(recipient => {
      handleRecipientSelect(recipient.phoneNumber);
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6  w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          {/* <h2 className="text-2xl font-semibold">Send SMS</h2> */}
          <div className="flex items-center p-2 hover:bg-gray-100 border-b-blue-600 border-b-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="w-5 h-5 mr-3"
            />
            <div className="flex w-[15rem] ">
              <h2 className="text-2xl font-semibold">Send SMS</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div className="mb-4 max-h-96 overflow-y-auto">
          {/* <div className="flex items-center p-2 hover:bg-gray-100 border-b-blue-600 border-b-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="w-5 h-5 mr-3"
            />
            <div className="flex-1 ">
            <h2 className="text-2xl font-semibold">Send SMS</h2>
            </div>
          </div> */}
          {recipients.map((recipient) => (
            <div key={recipient.phoneNumber} className="flex items-center p-2 hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedRecipients.has(recipient.phoneNumber)}
                onChange={() => handleRecipientSelect(recipient.phoneNumber)}
                className="w-5 h-5 mr-3"
              />
              <div className="flex-1">
                <p className="font-medium">{recipient.username}</p>
                <p className="text-gray-600">{recipient.phoneNumber}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleSubmit} // Updated: Send SMS on click
            disabled={isSending}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Send Messages"}
          </button>
        </div>

        {sendStatus && (
          <div
            className={`mt-4 p-3 rounded-lg ${sendStatus.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
          >
            {sendStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default SMSModal;

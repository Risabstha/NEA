import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SMSModal = ({
  isOpen,
  onClose,
  smsMessage,
  setSmsMessage,
  recipients,
  selectedRecipients,
  handleRecipientSelect,
  handleSendMessages,
  isSending,
  sendStatus,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Send SMS</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg">Message Content:</label>
          <textarea
            value={smsMessage}
            onChange={(e) => setSmsMessage(e.target.value)}
            className="w-full p-2 border rounded-lg h-32 max-h-36"
            placeholder="Type your message here..."
          />
        </div>

        <div className="mb-4 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2">Recipients</h3>
          {recipients.map((recipient) => (
            <div key={recipient.id} className="flex items-center p-2 hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedRecipients.has(recipient.id)}
                onChange={() => handleRecipientSelect(recipient.id)}
                className="w-5 h-5 mr-3"
              />
              <div className="flex-1">
                <p className="font-medium">{recipient.name}</p>
                <p className="text-gray-600">{recipient.phone}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleSendMessages}
            disabled={isSending}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Send Messages"}
          </button>
        </div>

        {sendStatus && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              sendStatus.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
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

import React from 'react';
import { MdCheckCircle, MdError } from 'react-icons/md';

const Modal = ({ message, onClose, isVerified }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center">
        <h2 className="text-lg font-semibold mb-4">Notification</h2>
        <div className="flex justify-center mb-4">
          {isVerified ? (
            <MdCheckCircle className="text-green-500 text-4xl" />
          ) : (
            <MdError className="text-red-500 text-4xl" />
          )}
        </div>
        <p className="mb-4">{message}</p>
        <button 
          onClick={onClose} 
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;

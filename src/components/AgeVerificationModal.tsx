import React from 'react';

interface AgeVerificationModalProps {
  onAgree: () => void;
  onDisagree: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onAgree, onDisagree }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Semi-transparent black background */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
      
      {/* Modal Content */}
      <div className="relative z-10 bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-8">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Are you 18+ years old?
        </h2>

        {/* Message */}
        <div className="text-gray-700 text-center space-y-3 mb-6">
        
          <p className="text-sm">
            The contents you are about to view are not for minors. 
            This website is for use solely by responsible adults over the age of 18.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Please note that we shall not be responsible for any loss, damages, and troubles.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onAgree}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            I Agree
          </button>
          <button
            onClick={onDisagree}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            I Disagree
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
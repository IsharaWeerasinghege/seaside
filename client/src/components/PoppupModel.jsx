import React from 'react';

const PopupModal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen ? (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                            onClick={onClose}
                        ></div>
                        <div className="relative bg-white rounded-lg px-4 py-6 shadow-xl">
                            {children}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default PopupModal;
"use client";
import React from "react";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
    show: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 text-center border-t-4 border-green-500 animate-in zoom-in-95 duration-300 relative">

                <div className="mb-6 flex justify-center">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle size={48} className="text-green-600" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-heading)] mb-2">Request Received!</h2>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you for reaching out. <br />
                    Our support team has successfully received your request and will contact you shortly to coordinate the sacred rituals.
                </p>

                <button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors"
                    onClick={onClose}
                >
                    Close
                </button>

            </div>
        </div>
    );
};

export default SuccessModal;

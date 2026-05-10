import { X } from "lucide-react";

const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/20 px-4">
      <div className="panel max-h-[90vh] w-full max-w-3xl overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

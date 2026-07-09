import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function TaskView({ taskId, title, description, status, points = [], onClose }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      {open && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0 bg-black/10 rounded-lg"
            onClick={handleClose}
          />
          <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900">Task Details</h2>
              <span className={
                status === "pending"
                  ? "text-xs font-medium px-3 py-1 rounded-xl border border-blue-400 bg-blue-100 text-blue-600"
                  : "text-xs font-medium px-3 py-1 rounded-xl border border-green-500 bg-green-100 text-green-600"
              }>
                {status}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 mb-1 uppercase tracking-widest">
                  Title
                </label>
                <p className="text-base font-medium text-gray-900">{title}</p>
              </div>

              {description && (
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 mb-1 uppercase tracking-widest">
                    Description
                  </label>
                  <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                </div>
              )}

              {points.length > 0 && (
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 mb-1.5 uppercase tracking-widest">
                    Points
                  </label>
                  <ul className="flex flex-col gap-1.5">
                    {points.map((p, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 px-3 py-1.5 rounded-lg bg-[#6365f118] border border-[#6366F1]/20 text-sm text-gray-700"
                      >
                        <span className="text-[#6366F1] mt-0.5">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={handleClose}
              className="w-full mt-6 px-4 py-2.5 rounded-xl bg-[#6366F1] text-white text-sm font-semibold hover:bg-[#4F46E5] transition-colors"
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default TaskView;
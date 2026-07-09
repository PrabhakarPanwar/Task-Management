import React, { useState } from "react";
import api from "../utils/api";
import { useSubmitGuard } from "../hooks/useSubmitGuard";
import { createPortal } from "react-dom";
import { toastify } from "../utils/toast";

function DeleteTask({ taskId, setRefresh }) {
    const [open, setOpen] = useState(false);
    const { isSubmitting, guard } = useSubmitGuard()

    const handleDelete = async () => {
        const res = await guard(() => api.delete("/api/tasks", {
            data: { taskId },
        }));
        toastify(res, "/login")

        setRefresh((prev) => !prev);
        setOpen(false);


    };

    return (
        <>
            {/* Delete button */}
            <button
                onClick={() => setOpen(true)}
                className="w-8 h-8 rounded-lg bg-mist hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-slate transition-colors"
            >
                <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </button>

            {/* Confirmation modal */}
            {open && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div
                        className="rounded-lg absolute inset-0 bg-black/10"
                        onClick={() => setOpen(false)}
                    />

                    <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Confirm Delete
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this task? This action cannot be
                            undone.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setOpen(false)}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                            >
                                {isSubmitting ? "Deleting Task..." : "Delete Task"}
                            </button>
                        </div>
                    </div>
                </div>, document.body
            )}
        </>
    );
}

export default DeleteTask;

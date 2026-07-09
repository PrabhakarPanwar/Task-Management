import React, { useState } from 'react'
import api from '../utils/api';
import { useSubmitGuard } from '../hooks/useSubmitGuard';
import { createPortal } from 'react-dom';
import { toastify } from '../utils/toast';
import PointsInput from './PointsInput';

function UpdateTask({ taskId, setRefresh, task }) {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(task?.status || "completed")
    const [title, setTitle] = useState(task?.title || "")
    const [description, setDescription] = useState(task?.description || "")
    const [points, setPoints] = useState(task?.points || []);
    const { isSubmitting, guard } = useSubmitGuard()

    const handleOpen = () => {
        setTitle(task?.title || "")
        setDescription(task?.description || "")
        setStatus(task?.status || "completed")
        setPoints(task?.points || [])
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await guard(() => api.put("/api/tasks",
            { taskId, title, description, status, points },
        ))
        toastify(res, "/login")

        setRefresh(prev => !prev);
        setOpen(false)
    }

    return (
        <>
            <button
                onClick={handleOpen}
                className="w-8 h-8 rounded-lg bg-mist hover:bg-[#6365f34f] hover:text-[#6366F3] flex items-center justify-center text-slate transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            {open && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">

                        <div className="flex items-center justify-between mb-5">
                            <h2 className=" font-semibold text-gray-900">Update Task</h2>
                            <button
                                onClick={handleClose}
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-300 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Title */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={isSubmitting}
                                    placeholder="New title?"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6366F1]  transition-all"
                                    autoFocus
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                                    Description <span className="normal-case text-gray-400">(optional)</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    disabled={isSubmitting}
                                    placeholder="Add some details…"
                                    rows={3}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all resize-none"
                                />
                            </div>

                            {/* Add a new point */}
                            <PointsInput points={points} setPoints={setPoints} disabled={isSubmitting}/>


                            {/* Status */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                                    STATUS
                                </label>
                                <div className='flex gap-3 '>
                                    <label className='flex-1 flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer has-[:checked]:border-blue-500 has-[:checked]:bg-blue-100 transition-colors'>
                                        <input type="radio" name="task-status"
                                            checked={status === "pending"}
                                            disabled={isSubmitting}
                                            onChange={() => setStatus("pending")}
                                            className='accent-[#6366F3]' />
                                        <span className="text-sm font-medium">Pending</span>
                                    </label>
                                    <label className='flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 cursor-pointer has-[:checked]:border-green-500 has-[:checked]:bg-green-100 transition-colors'>
                                        <input type="radio" name="task-status"
                                            checked={status === "completed"}
                                            disabled={isSubmitting}
                                            onChange={() => setStatus("completed")}
                                            className='accent-green-400' />
                                        <span className="text-sm font-medium">Completed</span>
                                    </label>
                                </div>
                            </div>

                            {/* button */}
                            <div className="flex gap-2 pt-1">
                                <button
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#6366F1] text-white text-sm font-semibold hover:bg-[#4F46E5] transition-colors"
                                >
                                    {isSubmitting ? "Updating Task..." : "Update Task"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>, document.body
            )}
        </>
    )
}

export default UpdateTask
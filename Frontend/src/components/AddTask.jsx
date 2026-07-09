import React, { useState } from 'react'
import { useSubmitGuard } from '../hooks/useSubmitGuard';
import api from '../utils/api';
import { toastify } from '../utils/toast';
import PointsInput from './PointsInput';

function AddTask({ setRefresh }) {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState("completed")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [points, setPoints] = useState([]);
    const [error, setError] = useState("")
    const { isSubmitting, guard } = useSubmitGuard()

    const handleClose = () => {
        setOpen(false)
        setTitle("")
        setDescription("")
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim()) {
            setError("Task title is required.")
            return
        }
        const res = await guard(() => api.post("/api/tasks", { title, description, status, points },))
        toastify(res, "/login")

        setRefresh(prev => !prev);
        handleClose()
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-[#6366F1] text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 justify-center hover:scale-[1.02] hover:shadow-lg"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                Add Task
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">

                        <div className="flex items-center justify-between mb-5">
                            <h2 className=" font-semibold text-gray-900">New Task</h2>
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

                            {/* title  */}

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                        setError("")
                                    }}
                                    disabled={isSubmitting}
                                    placeholder="What needs to be done?"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6366F1]  transition-all"
                                    autoFocus
                                />
                                {error && (
                                    <p className="mt-1.5 text-xs text-red-500">{error}</p>
                                )}
                            </div>

                            {/* description  */}

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

                            {/* Inputs */}

                            <PointsInput points={points} setPoints={setPoints} disabled={isSubmitting} />

                            {/* status  */}

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                                    STATUS
                                </label>
                                <div className='flex gap-3 '>
                                    <label className='flex-1 flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer has-[:checked]:border-blue-500 has-[:checked]:bg-blue-100 transition-colors'>
                                        <input type="radio" name="task-status"
                                            checked={status === "pending"}
                                            onChange={() => setStatus("pending")}
                                            className='accent-[#6366F3]' />
                                        <span className="text-sm font-medium">Pending</span>
                                    </label>
                                    <label className='flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 cursor-pointer has-[:checked]:border-green-500 has-[:checked]:bg-green-100 transition-colors'>
                                        <input type="radio" name="task-status"
                                            checked={status === "completed"}
                                            onChange={() => setStatus("completed")}
                                            className='accent-green-400' />
                                        <span className="text-sm font-medium">Completed</span>
                                    </label>
                                </div>
                            </div>

                            {/* popup */}

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
                                    {isSubmitting ? "Adding Task..." : "Add Task"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddTask
import React, { useState } from 'react';

function PointsInput({ points, setPoints, disabled }) {
    const [draft, setDraft] = useState("");
    const [adding, setAdding] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingValue, setEditingValue] = useState("");

    const commitDraft = () => {
        const value = draft.trim();
        if (value) {
            setPoints([...points, value]);
        }
        setDraft("");
        setAdding(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            commitDraft();
        }
        if (e.key === "Escape") {
            setDraft("");
            setAdding(false);
        }
    };

    const removePoint = (index) => {
        setPoints(points.filter((_, i) => i !== index));
        if (editingIndex === index) {
            setEditingIndex(null);
            setEditingValue("");
        }
    };

    const startEditPoint = (index) => {
        setEditingIndex(index);
        setEditingValue(points[index]);
    };

    const saveEditPoint = (index) => {
        if (editingValue.trim()) {
            setPoints(points.map((p, i) => (i === index ? editingValue.trim() : p)));
        }
        setEditingIndex(null);
        setEditingValue("");
    };

    const cancelEditPoint = () => {
        setEditingIndex(null);
        setEditingValue("");
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                Points <span className="normal-case text-gray-400">(optional)</span>
            </label>

            {points.length > 0 && (
                <ul className="flex flex-col gap-1.5">
                    {points.map((p, i) => (
                        <li
                            key={i}
                            className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#6365f118] border border-[#6366F1]/20 text-sm"
                        >
                            {editingIndex === i ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingValue}
                                        onChange={(e) => setEditingValue(e.target.value)}
                                        disabled={disabled}
                                        autoFocus
                                        className="flex-1 px-2 py-1 rounded-md border border-[#6366F1]/40 text-sm focus:outline-none"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") saveEditPoint(i);
                                            if (e.key === "Escape") cancelEditPoint();
                                        }}
                                    />
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => saveEditPoint(i)}
                                            className="text-green-600 hover:text-green-700 text-xs font-semibold px-1"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEditPoint}
                                            className="text-gray-400 hover:text-gray-600 text-xs font-semibold px-1"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="truncate">{p}</span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => startEditPoint(i)}
                                            className="text-gray-400 hover:text-[#6366F1] text-xs font-bold px-1"
                                            aria-label="Edit point"
                                        >
                                            ✎
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removePoint(i)}
                                            className="text-gray-400 hover:text-red-500 text-xs font-bold px-1"
                                            aria-label="Remove point"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {adding ? (
                <input
                    autoFocus
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={commitDraft}
                    disabled={disabled}
                    placeholder="Type a point and press Enter…"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#6366F1] outline-none transition-colors"
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setAdding(true)}
                    disabled={disabled}
                    className="self-start text-sm font-medium text-[#6366F1] hover:underline"
                >
                    + Add point
                </button>
            )}
        </div>
    );
}

export default PointsInput;
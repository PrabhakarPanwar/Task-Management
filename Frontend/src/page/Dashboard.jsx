import React, { useState } from 'react'
import { useEffect } from 'react'
import AddTask from '../components/AddTask'
import { sendVerify, taskList } from '../utils/DataApi';
import DeleteTask from './../components/DeleteTask';
import UpdateTask from '../components/UpdateTask';

function Dashboard() {

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const name = localStorage.getItem("username") || "user"
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        await sendVerify()
        const data = await taskList()
        if (data) {
          setTasks(data)
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [refresh]);

  const filteredTasks = tasks
    .filter(i => filter === "all" ? true : i.status === filter)
    .filter(i => i.title.toLowerCase().includes(search.toLowerCase()))

  const tabClass = (name) =>
    `px-4 py-2 text-sm font-medium transition-colors border-b-2 ${filter === name
      ? 'text-[#6366F1] border-[#6366F1]'
      : 'text-gray-500 border-transparent hover:text-[#6366F1]'
    }`




  return (
    <div className='bg-[#F3F4F6]'>

      {/* Header  */}

      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className=" mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#6366F1] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-ink">TaskFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm hidden sm:block">Hi, <span className="font-semibold capitalize">{name}</span></div>
            <div className="w-7 h-7 rounded-full bg-[#6365f138] text-[#6366F1] font-bold uppercase text-sm flex justify-center items-center">{name.slice(0, 1)}</div>
          </div>
        </div>
      </header>


      <div className="mx-auto px-4 py-8">

        {/* task counter  */}

        <section className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div id="stat-total" className=" text-3xl font-bold text-ink">{tasks.length}</div>
            <div className="text-xs mt-1 font-medium uppercase tracking-wide">Total</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div id="stat-pending" className=" text-3xl font-bold text-warn">{tasks.filter(i => i.status === "pending").length}</div>
            <div className="text-xs mt-1 font-medium uppercase tracking-wide">Pending</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div id="stat-done" className=" text-3xl font-bold text-done">{tasks.filter(i => i.status === "completed").length}</div>
            <div className="text-xs mt-1 font-medium uppercase tracking-wide">Done</div>
          </div>
        </section>

        {/* searchbar */}

        <section className="flex flex-col sm:flex-row items-stretch gap-3 mb-5">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              onChange={(i) => setSearch(i.target.value)}
              type="text"
              placeholder="Search tasks…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-[#6366F3] transition-colors" />
          </div>

          {/* addbutton component  */}

          <AddTask setRefresh={setRefresh} />


        </section>

        {/* status Tabs  */}

        <section className="flex gap-0 mb-5 border-b border-gray-200">
          <button onClick={() => setFilter('all')} className={tabClass('all')}>All</button>
          <button onClick={() => setFilter('pending')} className={tabClass('pending')}>Pending</button>
          <button onClick={() => setFilter('completed')} className={tabClass('completed')}>Completed</button>
        </section>

        {/* status tab filter  */}

        <section className="flex flex-col gap-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <svg className="w-8 h-8 animate-spin text-[#6366F1]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <p className="text-sm text-gray-400 mt-3">Loading tasks…</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#6365f379] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#6366F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="font-semibold text-lg mb-1">No tasks found</p>
              <p className="text-sm text-gray-400">
                {search ? `No results for "${search}"` : "Add your first task to get started"}
              </p>
            </div>
          ) : (
            filteredTasks.map((i) => (
              <div key={i._id} className='flex justify-between gap-2 p-4 items-center shadow-md rounded-lg bg-white hover:shadow-lg hover:scale-[1.01]'>
                <div>
                  <p className="font-medium">{i.title}</p>
                  <p className='text-[12px] text-gray-500'>{i.description}</p>
                </div>
                <div className='flex items-center gap-3'>
                  <span className={
                    i.status === "pending"
                      ? "text-xs font-medium px-3 py-1 rounded-xl border border-blue-400 bg-blue-100 text-blue-600"
                      : "text-xs font-medium px-3 py-1 rounded-xl border border-green-500 bg-green-100 text-green-600"
                  }>
                    {i.status}
                  </span>

                  {/* update button component  */}

                  <UpdateTask taskId={i._id} setRefresh={setRefresh} />

                  {/* delete button component  */}

                  <DeleteTask taskId={i._id} setRefresh={setRefresh} />
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  )
}

export default Dashboard
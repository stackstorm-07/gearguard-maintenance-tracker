import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newEquipment, setNewEquipment] = useState("");

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleAddRequest = () => {
    if (!selectedDate || !newTitle || !newEquipment) return;
    console.log('New Request:', { title: newTitle, equipment: newEquipment, date: selectedDate });
    setModalOpen(false);
    setNewTitle("");
    setNewEquipment("");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Preventive Maintenance Calendar</h1>

      <Calendar
        onClickDay={handleDateClick}
        className="rounded-lg shadow p-4 bg-white"
      />

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start">
          <div className="bg-white p-6 rounded shadow max-w-md mt-20 w-full">
            <h2 className="text-xl font-semibold mb-4">Schedule Maintenance</h2>
            <input
              type="text"
              placeholder="Maintenance Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Equipment Name"
              value={newEquipment}
              onChange={(e) => setNewEquipment(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRequest}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;

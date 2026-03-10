import { useEffect, useRef, useState } from "react";
import API from "../Services/api";

function MedicineReminder() {

  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState([]);
  const timeoutsRef = useRef({});

  useEffect(() => {

    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };

  }, []);

  const scheduleAlarm = (id, name, timeString) => {

    const [hours, minutes] = timeString.split(":").map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);

    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    const delay = target.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 880;
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();

        setTimeout(() => {
          oscillator.stop();
          ctx.close();
        }, 1500);
      } catch {
        // ignore audio errors
      }

      alert(`Time to take your medicine: ${name}`);

      scheduleAlarm(id, name, timeString);

    }, delay);

    timeoutsRef.current[id] = timeoutId;

  };

  const handleAdd = async () => {

    if (!medicine || !time) {
      alert("Please enter medicine name and time.");
      return;
    }

    try {

      await API.post("/medicine/add", {
        name: medicine,
        time
      });

      const id = Date.now().toString();
      const newReminder = { id, name: medicine, time };
      setReminders((prev) => [...prev, newReminder]);
      scheduleAlarm(id, medicine, time);
      setMedicine("");
      setTime("");

      alert("Medicine reminder set");

    } catch (err) {

      console.error("Error saving medicine reminder", err);
      alert(err.response?.data?.message || "Error saving reminder");

    }

  };

  const handleRemove = (id) => {

    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }

    setReminders((prev) => prev.filter((r) => r.id !== id));

  };

  return (

    <div className="mt-3">

      <h5>Medicine Reminder</h5>

      <input
        className="form-control mb-2"
        placeholder="Medicine Name"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
      />

      <input
        type="time"
        className="form-control mb-2"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button className="btn btn-warning" onClick={handleAdd}>
        Add Reminder
      </button>

      {reminders.length > 0 && (
        <ul className="mt-3 list-group">
          {reminders.map((r) => (
            <li
              key={r.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {r.name} at {r.time}
              </span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleRemove(r.id)}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}

    </div>

  );
}

export default MedicineReminder;
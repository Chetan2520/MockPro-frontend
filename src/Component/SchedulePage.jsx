import react from "react"
import ScheduleInterviewForm from "./ScheduleInterviewForm";

const SchedulePage = () => {
  const handleSchedule = async (formData) => {
    console.log("Form Data:", formData); // check if data is coming
    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <ScheduleInterviewForm onSubmit={handleSchedule} />
    </div>
  );
};

export default SchedulePage;

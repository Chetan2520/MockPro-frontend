import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { initVapi, getVapiInstance } from "./vapi.js";
import { interviewer, questionsArray } from "./Interviewer.jsx";
import Navbar from "./Component/Navbar.jsx";
import MagneticButton from "./Component/MagneticButton.jsx";
import robo from "./assets/robo.png"
import avatar from "./assets/avatar.png"
const Agent2 = () => {
  const userName = "You";
  const userId = 123;
  const interviewId = 11;
  const feedbackId = 111;

  const [interviewType, setInterviewType] = useState("technical");
  const [callStatus, setCallStatus] = useState("INACTIVE");
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();

  const questions = questionsArray;

  const formattedQuestions = useMemo(() => {
    return questions?.map((q) => `- ${q}`).join("\n") || "";
  }, [questions]);

  const setupVapiEvents = useCallback((vapi) => {
    const onCallStart = () => setCallStatus("ACTIVE");
    const onCallEnd = () => setCallStatus("FINISHED");
    const onMessage = (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [
          ...prev,
          {
            role: message.role,
            content: message.transcript,
          },
        ]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (err) => console.error("Vapi Error:", err);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    let cleanup;
    const setup = async () => {
      await initVapi();
      const vapi = getVapiInstance();
      cleanup = setupVapiEvents(vapi);
    };
    setup();
    return () => {
      if (cleanup) cleanup();
    };
  }, [setupVapiEvents]);

  useEffect(() => {
    if (callStatus === "FINISHED" && interviewType === "generate") {
      navigate("/");
    }
  }, [callStatus, interviewType, navigate]);

  const handleCall = async () => {
    setCallStatus("CONNECTING");
    const vapi = getVapiInstance();
    await vapi.start("17121f31-ae34-4f4b-b372-11f850d960f7", {
      variableValues: {
        username: userName,
        userid: userId,
        type: interviewType,
        interviewId,
        questions, // question vapi ke through database me save ho rha hai hame database se question nikalna padega
      },
    });
  };

  const handleDisconnect = () => {
    const vapi = getVapiInstance();
    vapi.stop();
    setCallStatus("FINISHED");
  };

  const renderCallButton = () => {
    const isIdle = callStatus === "INACTIVE" || callStatus === "FINISHED";
    if (callStatus === "ACTIVE") {
      return (
        <button
          onClick={handleDisconnect}
          className="btn text-red-500 rounded-lg font-semibold px-8 border border-red-500 py-2"
        >
          End
        </button>
      );
    }
    return (
      <>
       
        <button onClick={handleCall} className="btn rounded-lg text-green-600 font-semibold border border-green-500 px-5 py-3">
          {isIdle ? "Start Interview" : "Preparing Your Interview..."}
        </button>


      </>
    );
  };

  return (
    <>
     <Navbar/>
      <div className="flex flex-col items-center justify-center gap-6 py-8 px-4  md:flex-row">
        <ProfileCard
       
          name="AI Interviewer"
          img={robo}
          isSpeaking={isSpeaking}
        />
        <ProfileCard name={userName} img={avatar} />
      </div>

       {messages.length > 0 && (
  <div className="w-full max-w-4xl mt-10 mx-auto my-4 p-4 overflow-y-auto dark-scrollbar   rounded-xl shadow-sm bg-black">
    <div className="space-y-4 text-sm">
      {messages.length > 0 && (
  <div className="w-full max-w-2xl mt-10 mx-auto p-6 bg-zinc-900 rounded-xl shadow-md border border-zinc-800">
    <div className="text-white space-y-2 flex gap-5 items-center">
  <p className="text-md text-zinc-400 tracking-wide whitespace-nowrap">
    {messages[messages.length - 1].role}:
  </p>
  <p className="text-sm break-words">
    {messages[messages.length - 1].content}
  </p>
</div>

  </div>
)}

    </div>
  </div>
)}


      <div className="w-full flex flex-wrap justify-center gap-4 mt-6">
        {renderCallButton()}
      </div>
    </>
  );
};

const ProfileCard = ({ name, img, isSpeaking }) => (
  <div className="flex flex-col items-center  gap-5 p-4 border border-zinc-800 rounded-xl text-zinc-200 shadow-md bg-black w-60">
    <div className="relative bg-zinc-900 rounded-full">
      <img
        src={img}
        alt={name}
        className="w-36 h-36 rounded-full object-cover"
      />
      {isSpeaking && (
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-700 rounded-full animate-ping"></span>
      )}
    </div>
    <h3 className="text-lg  font-semibold text-gray-100">{name}</h3>
  </div>

);

export default Agent2;

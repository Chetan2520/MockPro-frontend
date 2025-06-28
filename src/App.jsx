import React from "react";
import Navbar from "./Component/Navbar";
import Hero from "./Component/Hero";
import SocialProof from "./Component/SocialProof";
import Features from "./Component/Features";
import HowItWorks from "./Component/HowItWorks";
import TechStack from "./Component/TechStack";
import WhyChooseUs from "./Component/WhyChooseUs";
import BecomeInterviewer from "./Component/BecomeInterviewer";
import FAQ from "./Component/FAQ";
import { Routes, Route } from "react-router-dom";
import Footer from "./Component/Footer";
import Testimonials from "./Component/Testimonials";
import Dashboard from "./Component/Dashboard";
import Agent2 from "./Agent2";
import Agent from "./Agent";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ScheduleInterviewForm from "./Component/ScheduleInterviewForm";
import SchedulePage from "./Component/SchedulePage";
const App = () => {
  return (
    <div className="min-h-screen bg-black">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <main>
                <Navbar />
                {/* <Dashboard /> */}
                <Hero />
                <Features />
                <HowItWorks />
                <TechStack />
                <WhyChooseUs />
                <BecomeInterviewer />
                <FAQ />
                <Testimonials />
              </main>
              <Footer />
            </>
          }
        />
        <Route path="/interview" element={<Agent />} />
        <Route path="/form" element={<ScheduleInterviewForm/>} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

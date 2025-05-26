// src/vapi.js
import Vapi from "@vapi-ai/web";

let vapi = null;

export const initVapi = async () => {
  const res = await fetch("https://m-ock-pro-backend.vercel.app/api/vapi/token");
  const data = await res.json();
  vapi = new Vapi(data.token);
  return vapi;
};

export const getVapiInstance = () => vapi;

import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
export const API_PROMPT = 'Generate travel plan for location:{location} for {noOfDays} days for {people} people with {budget}budget, give me hotel options list with hotel name hotel address price hotel image url geocoordinates ratings descriptions and suggest itinerary with placeName palce Details place image url geocoordinates ticket pricing time to travel each location for {totalDays} days with each day planned and best time to visit and opening time and make sure to provide array of objects in JSON format and please make sure to do the same reference names each time.'
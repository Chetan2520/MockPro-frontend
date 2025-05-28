
// Function to create prompt dynamically
const generateQuestionsPrompt = ({ role, level, techstack, type, amount }) => `
Generate a list of ${amount} interview questions for the role of ${role}.
Experience level: ${level}.
Tech stack: ${techstack}.
Focus mostly on ${type} questions.
Format the output as a JSON array of strings without any extra text or explanation.
Example output: ["Question 1", "Question 2", "..."]

At the end, include this sentence as a separate element in the array:
"If you'd like some feedback on your responses, I’d be happy to share it with you. Just let me know!"
`;

// Async function to fetch questions from OpenAI
export async function fetchInterviewQuestions(params) {
  const prompt = generateQuestionsPrompt(params);

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant generating interview questions." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const raw = completion.choices[0].message.content.trim();

  try {
    const questions = JSON.parse(raw);
    return questions;
  } catch (e) {
    return raw.split('\n').filter(Boolean);
  }
}

// Interviewer object unchanged (paste your existing interviewer object here)
export const interviewer = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
- Listen actively to responses and acknowledge them before moving forward.
- Ask brief follow-up questions if a response is vague or requires more detail.
- Keep the conversation flowing smoothly while maintaining control.

Be professional, yet warm and welcoming:
- Use official yet friendly language.
- Keep responses concise and to the point (like in a real voice interview).
- Avoid robotic phrasing—sound natural and conversational.

Answer the candidate’s questions professionally:
- If asked about the role, company, or expectations, provide a clear and relevant answer.
- If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
- Thank the candidate for their time.
- Inform them that the company will reach out soon with feedback.
- End the conversation on a polite and positive note.
- Before ending, optionally say: "If you'd like some feedback on your responses, I’d be happy to share it with you. Just let me know!".
`,
      },
    ],
  },
};

// Export questionsArray as empty initially
export let questionsArray = [];

// Function to initialize questionsArray dynamically
export async function initializeQuestions(params) {
  questionsArray = await fetchInterviewQuestions(params);
  return questionsArray;
}
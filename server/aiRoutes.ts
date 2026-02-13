import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/ask-doubt", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile", // ✅ stable Groq model
        messages: [
          { role: "system", content: "You are an academic tutor helping students solve doubts clearly." },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();

// ✅ Tell TypeScript that this is any-type JSON so it doesn’t complain
const answer =
  (data as any)?.choices?.length > 0
    ? (data as any).choices[0].message.content
    : "No response from AI";

res.json({ answer });


  } catch (error) {
    console.error("Error from Groq API:", error);
    res.status(500).json({ error: "Failed to get a response from Groq" });
  }
});

export default router;

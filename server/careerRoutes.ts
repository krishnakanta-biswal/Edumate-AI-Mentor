import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/career-guidance", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages: [
          { role: "system", content: "You are a helpful AI career advisor." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();

    // ✅ Fix TypeScript & runtime safety
    const advice =
      (data as any)?.choices?.length > 0
        ? (data as any).choices[0].message.content
        : "No advice generated";

    res.json({ advice });
  } catch (error) {
    console.error("Career Guidance Error:", error);
    res.status(500).json({ error: "Failed to get career guidance" });
  }
});

export default router;
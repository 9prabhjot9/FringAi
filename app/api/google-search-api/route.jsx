import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { userInput, searchInput } = await req.json();

  if (!searchInput) {
    return NextResponse.json({ error: "Please pass user query" });
  }

  try {
    const apiKey = process.env.NEXT_GOOGLE_API_KEY; // Store in .env
    const cx = process.env.NEXT_GOOGLE_CX; // Your Programmable Search Engine ID

    const result = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        key: apiKey,
        cx: cx,
        q: searchInput, // Use searchInput dynamically
      },
    });

    return NextResponse.json(result.data);
  } catch (error) {
  const errMsg = error.response?.data || error.message || "Unknown error";
  console.error("Google API error:", errMsg);
  
  return NextResponse.json(
    { error: error.response?.data || error.message  },
    { status: error.response?.status || 500 }
  );
}
}
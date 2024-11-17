// app/api/spotify/audio-analysis/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { trackId } = await req.json(); // Spotify track ID

  const accessToken = 'BQBoad5rZHUzgBeoYj7pjbtwNwMxI0cJ97kac_Fm-KRxC4prZFxkkfJFnfnXmlsodVqJq8UBGAAv5Z6mOR9wCjtJgYbvQFnROCy967mP5vuKtBDCi-8'; // Replace with your valid token

  try {
    const response = await axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const audioAnalysis = response.data;

    // Extract useful attributes
    const { tempo, tempo_confidence, key, key_confidence, mode, mode_confidence } = audioAnalysis.track;

    return NextResponse.json({
      tempo,
      tempo_confidence,
      key,
      key_confidence,
      mode,
      mode_confidence,
      full_analysis: audioAnalysis, // Optional: include full analysis for deeper comparisons
    });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch audio analysis: ${error}` }, { status: 500 });
  }
}

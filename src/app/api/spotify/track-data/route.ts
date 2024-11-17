// app/api/spotify/audio-features/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { trackId } = await req.json();

  const accessToken = 'your_access_token_here'; // Replace with a valid token

  const response = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return NextResponse.json(response.data);
}

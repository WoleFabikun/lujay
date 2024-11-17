// app/api/spotify/refresh-token/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'querystring';

export async function POST(req: Request) {
  const { refresh_token } = await req.json();

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify({
        grant_type: 'refresh_token',
        refresh_token,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, expires_in } = response.data;

    return NextResponse.json({ access_token, expires_in });
  } catch (error) {
    return NextResponse.json({ error: `Failed to refresh token: ${error}` }, { status: 500 });
  }
}

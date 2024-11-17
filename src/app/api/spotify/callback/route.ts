// app/api/spotify/callback/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'querystring';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return NextResponse.json({ error: 'Invalid callback request' }, { status: 400 });
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    return NextResponse.json({
      access_token,
      refresh_token,
      expires_in,
    });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch access token: ${error}` }, { status: 500 });
  }
}

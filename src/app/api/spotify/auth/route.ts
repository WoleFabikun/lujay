// app/api/spotify/auth/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const state = Math.random().toString(36).substring(7); // Random state for CSRF protection
  const scope = 'user-read-private user-read-email playlist-read-private';

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI || '')}&state=${state}`;

  return NextResponse.redirect(authUrl);
}

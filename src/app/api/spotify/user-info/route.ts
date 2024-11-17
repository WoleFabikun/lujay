// app/api/spotify/user-info/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const accessToken = 'your_access_token'; // Replace with a valid token

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch user info: ${error}` }, { status: 500 });
  }
}

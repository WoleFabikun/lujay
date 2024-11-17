// utils/getAccessToken.ts
import axios from 'axios';

export async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID; // Replace with your Spotify Client ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Replace with your Spotify Client Secret

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Failed to fetch access token:', error);
    throw new Error('Unable to retrieve access token');
  }
}

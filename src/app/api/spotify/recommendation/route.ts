import { NextResponse } from 'next/server';
import axios from 'axios';
import { getAccessToken } from '@/lib/getToken';

export async function POST(req: Request) {
  return handleRequest(req);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trackId = searchParams.get('trackId');
  if (!trackId) {
    return NextResponse.json({ error: 'Missing "trackId" in query parameters' }, { status: 400 });
  }
  return handleRequest({ json: async () => ({ trackId }) });
}

async function handleRequest(req: Request) {
  const { trackId } = await req.json();

  if (!trackId) {
    return NextResponse.json({ error: 'Missing "trackId"' }, { status: 400 });
  }

  try {
    const accessToken = await getAccessToken();

    // Fetch Audio Features of the Seed Track
    const audioFeaturesResponse = await axios.get(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const {
      danceability,
      energy,
      instrumentalness,
      liveness,
      tempo,
    } = audioFeaturesResponse.data;

    // Fetch Recommendations Based on Seed Track and Attributes
    const recommendationsResponse = await axios.get(
      'https://api.spotify.com/v1/recommendations',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          seed_tracks: trackId,
          limit: 100,
          min_danceability: Math.max(danceability - 0.05, 0),
          max_danceability: Math.min(danceability + 0.05, 1),
          min_energy: Math.max(energy - 0.1, 0),
          max_energy: Math.min(energy + 0.1, 1),
          min_instrumentalness: Math.max(instrumentalness - 0.1, 0),
          max_instrumentalness: Math.min(instrumentalness + 0.1, 1),
          min_liveness: Math.max(liveness - 0.1, 0),
          max_liveness: Math.min(liveness + 0.1, 1),
          min_tempo: tempo - 5,
          max_tempo: tempo + 5,
        },
      }
    );

    const recommendations = recommendationsResponse.data.tracks.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(', '),
      preview_url: track.preview_url,
    }));

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Spotify API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}
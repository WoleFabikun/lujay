import axios from 'axios';

async function getAccessToken(): Promise<string> {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        grant_type: 'client_credentials',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Unable to fetch access token');
  }
}

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  if (!title) {
    return new Response(JSON.stringify({ error: 'Title is required' }), { status: 400 });
  }

  try {
    const accessToken = await getAccessToken();
    const searchRes = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: title,
        type: 'track',
        limit,
      },
    });

    const tracks = searchRes.data.tracks.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(', '),
      album: track.album.name,
      popularity: track.popularity || 'Unknown',
      explicit: track.explicit,
      preview_url: track.preview_url,
      external_url: track.external_urls.spotify,
    }));

    return new Response(JSON.stringify(tracks), { status: 200 });
  } catch (error: any) {
    console.error('Error fetching tracks:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch tracks' }), { status: 500 });
  }
}

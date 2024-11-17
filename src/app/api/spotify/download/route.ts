import { NextResponse } from 'next/server'
import AdmZip from 'adm-zip'
import fetch from 'node-fetch'

export async function POST(req: Request) {
  try {
    const { tracks } = await req.json()

    if (!tracks || !Array.isArray(tracks)) {
      return NextResponse.json({ error: 'Invalid tracks data' }, { status: 400 })
    }

    const zip = new AdmZip()

    for (const track of tracks) {
      if (track.preview_url) {
        const response = await fetch(track.preview_url)
        if (!response.ok) continue

        const buffer = await response.buffer()
        zip.addFile(`${track.name}-${track.id}.mp3`, buffer)
      }
    }

    const zipBuffer = zip.toBuffer()

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Disposition': 'attachment; filename="spotify_previews.zip"',
        'Content-Type': 'application/zip',
      },
    })
  } catch (error) {
    console.error('Error creating zip file:', error)
    return NextResponse.json({ error: 'Failed to create zip file' }, { status: 500 })
  }
}

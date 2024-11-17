'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SpotifyRecommendationApp() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    try {
      const response = await fetch(`/api/spotify/search?title=${encodeURIComponent(searchQuery)}&limit=10`)
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  const handleGetRecommendations = (trackId: string) => {
    // Redirect to recommendations page with the trackId as a query parameter
    router.push(`/recommendations?trackId=${trackId}`)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">LuJay</h1>

      {/* Search Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search for a Song</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter song name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress} // Added key press event
              className="flex-grow"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((track, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-grow">
                    <h3 className="font-semibold">{track.name}</h3>
                    <p className="text-sm text-gray-500">{track.artists}</p>
                    <p className="text-sm text-gray-500">{track.album}</p>
                    <p className="text-sm text-gray-500">Popularity: {track.popularity}</p>
                    {track.preview_url && (
                      <a
                        href={track.preview_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Preview Track
                      </a>
                    )}
                  </div>
                  <Button onClick={() => handleGetRecommendations(track.id)}>Get Recommendations</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

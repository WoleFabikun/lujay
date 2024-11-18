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
    router.push(`/recommendations?trackId=${trackId}`)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">LuJay</h1>

      {/* Search Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search for a Song</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              type="text"
              placeholder="Enter song name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-grow"
            />
            <Button onClick={handleSearch} className="w-full sm:w-auto">Search</Button>
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
                <div key={index} className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex-grow">
                    <h3 className="font-semibold">{track.name}</h3>
                    <p className="text-sm text-gray-500">{track.artists}</p>
                    <p className="text-sm text-gray-500">{track.album}</p>
                    <p className="text-sm text-gray-500">Popularity: {track.popularity}</p>
                    {track.preview_url && (
                      <audio controls className="w-full sm:w-60">
                        <source src={track.preview_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                  <Button
                    onClick={() => handleGetRecommendations(track.id)}
                    className="w-full sm:w-auto"
                  >
                    Get Recommendations
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import RecommendationResults from '@/components/results'

export default function RecommendationsPage() {
  const searchParams = useSearchParams()
  const trackId = searchParams.get('trackId')
  const [recommendations, setRecommendations] = useState(null)

  useEffect(() => {
    if (trackId) {
      const fetchRecommendations = async () => {
        try {
          const response = await fetch(`/api/spotify/recommendation?trackId=${trackId}`)
          const data = await response.json()
          setRecommendations(data)
        } catch (error) {
          console.error('Error fetching recommendations:', error)
        }
      }

      fetchRecommendations()
    }
  }, [trackId])

  if (!trackId) {
    return <p className="text-center">No track selected for recommendations.</p>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Recommendations</h1>
      {recommendations ? (
        <RecommendationResults data={recommendations} />
      ) : (
        <p className="text-center">Loading recommendations...</p>
      )}
    </div>
  )
}

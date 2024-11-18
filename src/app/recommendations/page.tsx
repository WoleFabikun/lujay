'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RecommendationResults from '@/components/results';
import { Suspense } from 'react';

function RecommendationsContent() {
  const searchParams = useSearchParams();
  const trackId = searchParams?.get('trackId');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trackId) return;

    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/spotify/recommendation?trackId=${trackId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
        }

        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [trackId]);

  if (!trackId) {
    return <p className="text-center">No track selected for recommendations.</p>;
  }

  if (loading) {
    return <p className="text-center text-white">Loading recommendations...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return recommendations ? (
    <RecommendationResults data={recommendations} />
  ) : (
    <p className="text-center">No recommendations found.</p>
  );
}

export default function RecommendationsPage() {
  return (
    <Suspense fallback={<p className="text-center text-white">Loading recommendations...</p>}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <RecommendationsContent />
      </div>
    </Suspense>
  );
}

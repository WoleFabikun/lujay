import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { Music2 } from 'lucide-react';
import { saveAs } from "file-saver"; // Install file-saver for downloading files.

type Track = {
  id: string;
  name: string;
  artist: string;
  preview_url: string | null;
};

export default function RecommendationResults({ data }: { data: Track[] }) {
  const handleDownloadAll = async () => {
    try {
      const response = await fetch("/api/spotify/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracks: data }),
      });
      if (!response.ok) throw new Error("Failed to download previews.");
      const blob = await response.blob();
      saveAs(blob, "spotify_previews.zip");
    } catch (error) {
      console.error("Error downloading previews:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Lu&apos;s Recommendations</h1>
      <button
        onClick={handleDownloadAll}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download All Previews
      </button>
      <Card>
        <CardHeader>
          <CardTitle>Recommended Tracks</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            {data.map((track, index) => (
              <div key={index} className="flex items-start space-x-4 mb-6 last:mb-0">
                <div className="flex-grow">
                  <h3 className="font-semibold">{track.name}</h3>
                  <p className="text-sm text-gray-500">{track.artist}</p>
                </div>
                {track.preview_url && (
                  <audio controls className="w-48">
                    <source src={track.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

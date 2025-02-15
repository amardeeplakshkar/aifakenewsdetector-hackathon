'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { analyzeNews } from '@/lib/openrouter';
import { useYtUrl } from '@/components/context/YtUrlContext';
import YtAnalysis from '@/components/YtAnalysis';
interface AnalysisResult {
  article_title: string;
  source: {
    name: string;
    credibility: string;
  };
  content_analysis: {
    factual_accuracy: string;
    bias_level: string;
    sensationalism: string;
  };
  verification_points: {
    real_points: number;
    real_points_breakdown: Array<{
      factor: string;
      points: number;
    }>;
    disputed_points: number;
    disputed_points_breakdown: Array<{
      factor: string;
      points: number;
    }>;
  };
  fact_check: {
    verified: string;
    supporting_sources: string[];
  };
  final_verdict: string;
  confidence_score: number;
  justification: string;
}

export default function CheckPage() {
  const router = useRouter();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { ytUrl } = useYtUrl();

  useEffect(() => {
    if (!ytUrl) {
      router.push('/');
      return;
    }

   
    const fetchYouTubeData = async () => {
      try {
        const response = await fetch('/api/youtube-loader', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: ytUrl }),
        });

        const { docs } = await response.json();
        if (!docs) {
          throw new Error('Failed to retrieve YouTube data');
        }

        const analysis = await analyzeNews(docs[0].pageContent);
        setAnalysisResult(analysis);
      } catch (error) {
        console.error('Error analyzing video:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchYouTubeData();
  }, [ytUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing Video...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {analysisResult && <YtAnalysis result={analysisResult} />}
      </main>
    </div>
  );
}
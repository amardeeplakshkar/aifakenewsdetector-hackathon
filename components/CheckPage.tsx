'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import NewsAnalysis from '@/components/NewsAnalysis';
import { useEffect, useState } from 'react';
import { analyzeNews } from '@/lib/openrouter';

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

export default function CheckPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = searchParams.get('url');
    if (!url) {
      router.push('/');
      return;
    }

    const fetchAnalysis = async () => {
      try {
        const result = await analyzeNews(url);
        setAnalysisResult(result);
      } catch (error) {
        console.error('Error analyzing article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [searchParams, router]);

  if (isLoading) {
    return null; // Suspense fallback already handles loading
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {analysisResult && <NewsAnalysis result={analysisResult} />}
      </main>
    </div>
  );
}

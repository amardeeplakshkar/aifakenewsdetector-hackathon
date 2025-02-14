'use client';

import { useState } from 'react';
import { Brain, NewspaperIcon, CheckCircle, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    try {
      router.push(`/checker?url=${encodeURIComponent(url)}`);
    } catch (error) {
      console.error('Error:', error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Detect Fake News with</span>
              <span className="block text-blue-600">AI-Powered Precision</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Trust in news again with our advanced AI technology that analyzes and verifies news sources in real-time.
            </p>
          </div>

          {/* URL Input Form */}
          <div className="mt-10 max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="url" className="text-sm font-medium text-gray-700">
                  Enter news article URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="https://example.com/article"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isAnalyzing}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isAnalyzing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Article'}
              </button>
            </form>
          </div>

          {/* Features */}
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <Brain className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">AI-Powered Analysis</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Advanced machine learning algorithms analyze content patterns and credibility markers.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <NewspaperIcon className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Source Verification</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Cross-reference against reliable sources and fact-checking databases.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <CheckCircle className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Real-time Results</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Get instant analysis results with detailed credibility scoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
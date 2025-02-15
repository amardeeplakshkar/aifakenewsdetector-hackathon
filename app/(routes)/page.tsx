'use client';

import { useState } from 'react';
import { Brain, NewspaperIcon, CheckCircle, Globe, Youtube } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { WordRotate } from '@/components/magicui/word-rotate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useYtUrl } from '@/components/context/YtUrlContext';

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const { ytUrl, setYtUrl } = useYtUrl();
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

  const handleYtSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      router.push(`/ytchecker`);
    } catch (error) {
      console.error('Error:', error);
      setIsAnalyzing(false);
    }
  };

  return (

    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Detect Fake News with</span>
            <span className="block text-blue-600">
              <WordRotate
                words={["AI-Powered Precision", "Cutting-Edge AI", "Unmatched Accuracy", "Next-Gen Technology", "Real-Time Verification"]}
              />
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Trust in news again with our advanced AI technology that analyzes and verifies news sources in real-time.
          </p>
        </div>

        {/* URL Input Form */}
        <div className="mt-10 max-w-xl mx-auto">
          <Tabs defaultValue="Article" className="w-full border p-4 rounded-xl shadow-lg bg-white">
            <TabsList className="grid w-full grid-cols-2 bg-accent-foreground/10">
              <TabsTrigger value="Article">
                <Globe className="text-blue-500 mr-2 h-4 w-4" />
                Article
              </TabsTrigger>
              <TabsTrigger value="Youtube">
              <Youtube className="text-red-500 mr-2 h-4 w-4" />
                Youtube
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Article">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="url" className="text-sm font-medium text-gray-700">
                    Enter news article URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
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
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isAnalyzing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Article'}
                </button>
              </form>
            </TabsContent>
            <TabsContent value="Youtube">
              <form onSubmit={handleYtSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="ytUrl" className="text-sm font-medium text-gray-700">
                    Enter YouTube Video URL
                  </label>
                  <div className="relative">
                    <Youtube className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      id="ytUrl"
                      value={ytUrl || ""}
                      onChange={(e) => setYtUrl(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                      placeholder="https://m.youtube.com/watch?v=..."
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isAnalyzing ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
                </button>
              </form>
            </TabsContent>
          </Tabs>

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
  );
}
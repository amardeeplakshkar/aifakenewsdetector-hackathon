import { 
  CheckCircle, 
  BarChart3, 
  Globe2, 
  Scale, 
  Newspaper, 
  ExternalLink,
  ThumbsUp,
  Percent,
  Check,
  AlertCircle
} from 'lucide-react';

interface NewsAnalysisProps {
  result: {
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
  };
}

export default function NewsAnalysis({ result }: NewsAnalysisProps) {
  const getVerdictColor = (verdict: string) => {
    switch (verdict.toLowerCase()) {
      case 'genuine':
        return 'text-green-600';
      case 'suspicious':
        return 'text-yellow-600';
      case 'fake':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPointsColor = (points: number) => {
    if (points >= 75) return 'text-green-600';
    if (points >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Article Title and Source */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Newspaper className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Article Information</h2>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Title</h3>
            <p className="mt-1 text-lg text-gray-900">{result.article_title}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Globe2 className="h-5 w-5 text-gray-400" />
            <span className="text-gray-900">Source: {result.source.name}</span>
            <span className="px-2 py-1 text-xs font-medium uppercase rounded-full bg-blue-100 text-blue-800">
              {result.source.credibility} credibility
            </span>
          </div>
        </div>
      </div>

      {/* Verification Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Check className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Real Points</h3>
            <span className={`ml-auto text-2xl font-bold ${getPointsColor(result.verification_points.real_points)}`}>
              {result.verification_points.real_points}
            </span>
          </div>
          <div className="space-y-2">
            {result.verification_points.real_points_breakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.factor}</span>
                <span className="font-medium text-green-600">+{item.points}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Disputed Points</h3>
            <span className={`ml-auto text-2xl font-bold ${getPointsColor(100 - result.verification_points.disputed_points)}`}>
              {result.verification_points.disputed_points}
            </span>
          </div>
          <div className="space-y-2">
            {result.verification_points.disputed_points_breakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.factor}</span>
                <span className="font-medium text-red-600">+{item.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verdict and Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Final Verdict</h3>
            </div>
            <span className={`text-2xl font-bold capitalize ${getVerdictColor(result.final_verdict)}`}>
              {result.final_verdict}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Percent className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Confidence Score</h3>
            </div>
            <span className={`text-2xl font-bold ${getConfidenceColor(result.confidence_score)}`}>
              {result.confidence_score}%
            </span>
          </div>
        </div>
      </div>

      {/* Content Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Content Analysis</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Factual Accuracy</h3>
            <p className="mt-1 text-lg font-semibold capitalize text-green-600">
              {result.content_analysis.factual_accuracy}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Bias Level</h3>
            <p className="mt-1 text-lg font-semibold capitalize text-yellow-600">
              {result.content_analysis.bias_level}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Sensationalism</h3>
            <p className="mt-1 text-lg font-semibold capitalize text-yellow-600">
              {result.content_analysis.sensationalism}
            </p>
          </div>
        </div>
      </div>

      {/* Supporting Sources */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Scale className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Supporting Sources</h2>
        </div>
        <div className="space-y-2">
          {result.fact_check.supporting_sources.map((source, index) => (
            <a
              key={index}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-4 w-4" />
              <span>{source}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Justification */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <CheckCircle className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Analysis Justification</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {result.justification}
        </p>
      </div>
    </div>
  );
}
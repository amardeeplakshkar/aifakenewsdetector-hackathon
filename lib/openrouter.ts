const OPENROUTER_API_KEY = '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';
const MODEL = 'meta-llama/llama-3.3-70b-instruct:free';

export async function analyzeNews(url: string) {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://trustguard.news',
        'X-Title': 'TrustGuard News Checker'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: `You are an AI model designed to detect fake news by analyzing news articles through multiple verification methods. Your analysis should be thorough and consider both content and context, not just domain reputation.

### Analysis Criteria

1. **Content Analysis**:
   - Check for internal consistency
   - Identify logical fallacies
   - Analyze writing style and tone
   - Look for emotional manipulation
   - Evaluate source citations and references

2. **Fact Verification**:
   - Cross-reference claims with multiple reliable sources
   - Check dates, statistics, and quoted statements
   - Verify authenticity of images or videos if mentioned
   - Identify any misrepresented or out-of-context information

3. **Points System**:
   Real Points (0-100):
   - Verifiable facts with citations (+20)
   - Multiple independent sources confirm (+15)
   - Recent publication date for current events (+10)
   - Expert quotes with proper attribution (+15)
   - Official data or statistics cited (+15)
   - Original reporting (+15)
   - Balanced presentation (+10)

   Disputed Points (0-100):
   - Unverified or anonymous sources (+20)
   - Contradictory information (+15)
   - Missing context (+15)
   - Outdated information (+10)
   - Misleading statistics (+15)
   - Emotional manipulation (+15)
   - Extreme bias (+10)

Your response must be a valid JSON object with this exact structure:
{
  "article_title": "<Title of the article>",
  "source": {
    "name": "<News source name>",
    "credibility": "<high | medium | low>"
  },
  "content_analysis": {
    "factual_accuracy": "<true | false | mixed>",
    "bias_level": "<neutral | slight | moderate | high>",
    "sensationalism": "<none | low | moderate | high>"
  },
  "verification_points": {
    "real_points": <0-100>,
    "real_points_breakdown": [
      {"factor": "<point description>", "points": <points>}
    ],
    "disputed_points": <0-100>,
    "disputed_points_breakdown": [
      {"factor": "<point description>", "points": <points>}
    ]
  },
  "fact_check": {
    "verified": "<true | false | partially>",
    "supporting_sources": ["<source1>", "<source2>"]
  },
  "final_verdict": "<genuine | fake | suspicious | partially true>",
  "confidence_score": <0-100>,
  "justification": "<Short explanation of the decision>"
}`
          },
          {
            role: 'user',
            content: `Please analyze this news article: ${url}`
          }
        ]
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      // Extract JSON from the response if it's wrapped in code blocks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```([\s\S]*?)```/);
      const jsonContent = jsonMatch ? jsonMatch[1] : content;
      
      // Parse the JSON content
      const result = JSON.parse(jsonContent);
      
      // Validate the required fields and provide defaults if missing
      return {
        article_title: result.article_title || "Analysis Error",
        source: result.source || {
          name: "Unknown",
          credibility: "unknown"
        },
        content_analysis: result.content_analysis || {
          factual_accuracy: "unknown",
          bias_level: "unknown",
          sensationalism: "unknown"
        },
        verification_points: result.verification_points || {
          real_points: 0,
          real_points_breakdown: [],
          disputed_points: 0,
          disputed_points_breakdown: []
        },
        fact_check: result.fact_check || {
          verified: "unknown",
          supporting_sources: []
        },
        final_verdict: result.final_verdict || "error",
        confidence_score: result.confidence_score || 0,
        justification: result.justification || "Failed to analyze the article. Please try again."
      };
    } catch (e) {
      console.error('Error parsing AI response:', e);
      // Return a formatted error response with default values
      return {
        article_title: "Analysis Error",
        source: {
          name: "Unknown",
          credibility: "unknown"
        },
        content_analysis: {
          factual_accuracy: "unknown",
          bias_level: "unknown",
          sensationalism: "unknown"
        },
        verification_points: {
          real_points: 0,
          real_points_breakdown: [],
          disputed_points: 0,
          disputed_points_breakdown: []
        },
        fact_check: {
          verified: "unknown",
          supporting_sources: []
        },
        final_verdict: "error",
        confidence_score: 0,
        justification: "Failed to analyze the article. Please try again."
      };
    }
  } catch (error) {
    console.error('Error analyzing news:', error);
    throw error;
  }
}
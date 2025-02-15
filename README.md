# TrustGuard - AI-Powered Fake News Detection

TrustGuard is an advanced AI-powered platform designed to detect and analyze potential fake news in articles and YouTube videos. Using state-of-the-art language models and comprehensive verification methods, TrustGuard helps users make informed decisions about the content they consume.

## Features

- **Article Analysis**: Analyze news articles for credibility and authenticity
- **YouTube Video Analysis**: Verify the credibility of YouTube video content
- **Comprehensive Scoring**: Detailed breakdown of real and disputed points
- **Content Analysis**: Evaluation of factual accuracy, bias level, and sensationalism
- **Supporting Sources**: Cross-referenced verification with reliable sources
- **Confidence Scoring**: Clear confidence metrics for analysis results
- **User Authentication**: Secure access with email/password authentication

## Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: Clerk
- **AI Integration**: OpenRouter API (Meta Llama 3)
- **3D Graphics**: Spline
- **Animation**: Motion

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or pnpm package manager

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trustguard.git
cd trustguard
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Article Analysis**:
   - Enter a news article URL in the input field
   - Click "Analyze Article" to get detailed credibility analysis

2. **YouTube Analysis**:
   - Switch to the YouTube tab
   - Paste a YouTube video URL
   - Click "Analyze Video" for content verification

3. **Results**:
   - View comprehensive analysis including:
     - Factual accuracy
     - Bias level
     - Sensationalism rating
     - Supporting sources
     - Final verdict with confidence score

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Clerk](https://clerk.com/) for authentication
- [OpenRouter](https://openrouter.ai/) for AI capabilities
- [Spline](https://spline.design/) for 3D graphics
- [shadcn/ui](https://ui.shadcn.com/) for UI components

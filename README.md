# MarketMind

AI-powered stock analysis platform with real-time data integration and natural language processing. Built with React, FastAPI, and DSPy for intelligent financial insights.

## Features

- **Natural Language Queries**: Ask questions like "Show me Apple stock performance" or "How did Tesla do last month?"
- **Real-time Market Data**: Current prices and company information via Finnhub API
- **Technical Analysis**: RSI, MACD, Bollinger Bands, moving averages, and volume indicators
- **AI-Generated Insights**: Comprehensive analysis using multiple LLM providers (OpenAI, DeepSeek, Gemini)
- **Interactive Charts**: Dynamic price charts with technical indicator overlays
- **Fundamental Metrics**: P/E ratios, profit margins, dividend yields, and financial health indicators
- **Shareable Analysis**: Generate unique links to share stock analysis reports

## Tech Stack & Architecture

**Frontend:**
- React 18 with TypeScript for type-safe development
- Tailwind CSS + Shadcn UI for modern, responsive design
- Recharts for interactive data visualization
- Framer Motion for smooth animations
- Vite for fast development and optimized builds

**Backend:**
- FastAPI with Python 3.11 for high-performance API development
- SQLAlchemy ORM with SQLite for data persistence
- Pydantic for data validation and serialization
- DSPy framework for LLM orchestration and prompt engineering
- TA-Lib integration for professional financial calculations

**AI/ML Integration:**
- Multi-provider LLM support (OpenAI GPT-4, DeepSeek, Google Gemini)
- DSPy framework for structured prompt engineering and chain-of-thought reasoning
- Real-time natural language query processing
- Dynamic analysis generation with structured output validation

**Data & APIs:**
- Finnhub API for real-time market data
- RESTful API design with automatic OpenAPI documentation
- Real-time technical indicator calculations
- Hybrid data approach combining live and generated historical data

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/marketmind.git
cd marketmind
```

### 2. Backend Setup

```bash
cd marketmind-backend
python -m venv venv

# Windows
venv\Scripts\activate

# Unix/MacOS
source venv/bin/activate

# Install TA-Lib (Windows users: see installation notes below)
pip install -r requirements.txt
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` and add your API keys (at least one required):

```env
# LLM Provider (choose one)
OPENAI_API_KEY=your_openai_key
DEEPSEEK_API_KEY=your_deepseek_key  
GEMINI_API_KEY=your_gemini_key
GITHUB_TOKEN=your_github_token

# Market Data
FINNHUB_API_KEY=your_finnhub_key
```

### 4. Frontend Setup

```bash
cd ../marketmind-frontend
npm install
```

### 5. Run Application

**Backend:**
```bash
cd marketmind-backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd marketmind-frontend  
npm run dev
```

Access the application at `http://localhost:5173`

## Docker Setup

```bash
# Set up environment
cp marketmind-backend/.env.example marketmind-backend/.env
# Edit .env with your API keys

# Run with Docker
docker-compose up --build
```

## API Keys Setup

### Required APIs

1. **LLM Provider** (choose one):
   - **OpenAI**: Get API key at https://platform.openai.com
   - **DeepSeek**: Sign up at https://platform.deepseek.com  
   - **Google Gemini**: Get key at https://makersuite.google.com
   - **GitHub Models**: Use your GitHub token at https://github.com/settings/tokens

2. **Market Data**:
   - **Finnhub**: Free tier available at https://finnhub.io/register

### TA-Lib Installation

**Windows:**
```bash
pip install TA-Lib
```

If installation fails, download pre-compiled wheels from [here](https://www.lfd.uci.edu/~gohlke/pythonlibs/#ta-lib)

**Linux/MacOS:**
```bash
# Install TA-Lib system dependency first
brew install ta-lib  # macOS
sudo apt-get install libta-lib-dev  # Ubuntu

pip install TA-Lib
```

## Usage Examples

- "Show me Apple stock performance over the last 3 months"
- "How is Microsoft doing compared to last year?"
- "Analyze Tesla's technical indicators"
- "What's the outlook for GOOGL?"

## Project Structure

```
marketmind/
├── marketmind-backend/          # FastAPI backend
│   ├── app/
│   │   ├── api/endpoints/      # REST API routes
│   │   ├── services/           # Business logic & DSPy integration
│   │   ├── db/                 # Database models & operations
│   │   └── main.py            # Application entry point
│   └── requirements.txt
├── marketmind-frontend/         # React frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── util/              # API client & utilities
│   │   └── App.tsx            # Main application
│   └── package.json
└── docker-compose.yml
```

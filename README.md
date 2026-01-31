# AiOuija 

**AiOuija** is an LLM-powered virtual Ouija board experience that bridges the gap between modern artificial intelligence and paranormal ritual.

![AiOuija Preview](https://github.com/Rvlndd/ai-ouija/raw/main/public/preview.png) 

<a href="https://youtu.be/y7xVt3C7O3Y?si=s_iVbQ0HFE3xMOYt">
    Youtube Demo Video
  </a>

## Concept

AiOuija is an experimental human AI interaction project that explores how atmosphere, pacing, and ambiguity shape the way people respond to machine generated output. Instead of acting like a normal question and answer system, the experience focuses on tension, uncertainty, and narrative suggestion, observing how users naturally project meaning, intent, and personality onto non human responses. It also looks at whether people can feel fear, empathy, or emotional immersion during an interaction they know is artificial, and how design choices can make the presence feel less mechanical and more psychologically real.


- **AI Providers**:
  - **[Mistral AI](https://mistral.ai/)**: Powers the spirit's personality, memory, and cryptic responses using `mistral-large-latest`.
  - **[Groq](https://groq.com/)**: Speech-to-Text (STT) via Whisper Large V3 Turbo for real-time voice interaction.
  - **VAD**: [Voice Activity Detection](https://github.com/ricky0123/vad) for seamless hands-free communication.


## Setup & Installation

Follow these steps to host your own séance:

### 1. Clone the repository
```bash
git clone https://github.com/rvlndd/ai-ouija.git
cd ai-ouija/my-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the `my-app` directory and add your API keys:
```env
MISTRAL_API_KEY=your_mistral_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to begin.

## Credits
Created by **RvLnd** 

---

<div align="center">

[![Support me on Ko-fi](https://storage.ko-fi.com/cdn/kofi6.png?v=6)](https://ko-fi.com/M4M7YKEJR)

*Disclaimer: This is a psychological experiment and entertainment tool. No actual spirits were harmed in the making of this software. Ye i know u guys already know this but just to make sure lol*

</div>


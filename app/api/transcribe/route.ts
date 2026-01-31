export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('audio') as File;

        if (!file) {
            return NextResponse.json({ error: 'No audio file uploaded' }, { status: 400 });
        }

        const transcription = await groq.audio.transcriptions.create({
            file,
            model: "whisper-large-v3-turbo",
            temperature: 0,
            response_format: "json",
        });

        return NextResponse.json({ text: transcription.text });

    } catch (error) {
        console.error('Transcription error:', error);
        return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
    }
}

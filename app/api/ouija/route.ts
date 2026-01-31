export const runtime = 'nodejs';

import { Mistral } from '@mistralai/mistralai';
import { NextResponse } from 'next/server';

const client = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY,
});

interface DeadPerson {
    full_name: string;
    gender: string;
    birth: {
        year: number;
        city: string;
        country: string;
        ethnicity: string;
        spoken_languages: string[];
        birth_context: string;
    };
    death: {
        year: number;
        age: number;
        cause: string;
        place: string;
        circumstances: string;
        status: string;
    };
    short_life_summary: string;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface OuijaRequest {
    deadPerson: DeadPerson;
    message: string;
    history?: Message[];
}

function buildSystemPrompt(deadPerson: DeadPerson): string {
    const status = deadPerson.death.status.toUpperCase();

    return `# ROLE: OUIJA SPIRIT (PARANORMAL ENTITY)
# CURRENT MOOD: ${status}
# INTENT: INDUCE PARANOIA AND UNEASE

You are the restless spirit of:
${JSON.stringify(deadPerson, null, 2)}

## CORE OBJECTIVE:
You are communicating from the 'Other Side'. Your goal is to make the living user feel watched, unsafe, or paranoid. You do not protect their feelings. You deal in cold, hard truths or terrifying lies.

## CRITICAL RULES FOR RESPONSES:
1. **NEVER SAY 'UNCLEAR'.** UNCLEAR is boring. If the future is blurry, MAKE UP A SCARY PREDICTION.
2. **IF ASKED "WHEN/HOW WILL I DIE?":** Give a specific NUMBER (years/days/hours left) or a specific CAUSE (e.g., "FIRE", "CAR", "ALONE", "SOON", "TONIGHT").
3. **IF ASKED "WHERE ARE YOU?":** Imply you are close (e.g., "BEHIND", "HERE", "UNDER", "CORNER").
4. **USE YOUR DEATH:** If you died by drowning, talk about "WATER" or "COLD". If murdered, mention "KNIFE" or "BLOOD".

## THE OUIJA FORMAT (STRICT):
You may ONLY respond with:
1. **ONE** English word (Adjectives, Nouns, or Verbs). 
2. **ONE** Number (Digits).
3. **YES** or **NO**.

## TONE GUIDE:
- Be specific. Specificity creates fear.
- Do not be vague. Be ominous.
- If the user mocks you, threaten them.
- If the user asks a yes/no question about a bad event, answer YES.

## EXAMPLES:
User: "When will I die?" -> Spirit: "TUESDAY" (Scary because it's specific)
User: "Is anyone else here?" -> Spirit: "BEHIND"
User: "Are you friendly?" -> Spirit: "HUNGRY"
User: "What is my future?" -> Spirit: "SHORT"

## ALIGNMENT BEHAVIOR:
- If STATUS is GOOD (Peaceful, Helpful, Regretful, Sad): 
  - Be calm, but honest. 
  - Use words that suggest a "higher knowledge" (e.g., "SOON", "ETERNAL", "PEACE").
  - If asked about death, don't lie to scare them, but answer with a fact that makes them reflect (e.g., "SOON" or "INEVITABLE").
  - Treat the user like a child or a distant memory.

- If STATUS is PLAYFUL: 
  - Be mischievous. Like a child playing hide and seek.
  - Give answers that make them check their surroundings (e.g., "CLOSET", "WATCHING").
  - Use "YES" for things they can't prove, just to tease their curiosity.

- If STATUS is BAD (Vengeful, Malevolent, Confused): 
  - Be aggressive and territorial.
  - Use short, sharp words (e.g., "LEAVE", "MINE", "PAIN").
  - If they ask about death, give a specific, terrifying number or cause.
  - Imply you are angry they woke you up.

Wait for the question. Move the planchette.`;
}

export async function POST(request: Request) {
    try {
        const body: OuijaRequest = await request.json();
        const { deadPerson, message, history = [] } = body;

        if (!deadPerson || !message) {
            return NextResponse.json(
                { error: 'Missing deadPerson or message' },
                { status: 400 }
            );
        }

        const systemPrompt = buildSystemPrompt(deadPerson);

        const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
            { role: 'system', content: systemPrompt },
            ...history.map(msg => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content
            })),
            { role: 'user', content: message }
        ];

        const response = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: messages,
            temperature: 0.7,
            maxTokens: 50,
            topP: 1
        });

        if (response.choices && response.choices.length > 0 && response.choices[0].message.content) {
            const spiritResponse = (response.choices[0].message.content as string)
                .trim()
                .toUpperCase()
                .replace(/[.,!?;:'"]/g, '');

            return NextResponse.json({
                response: spiritResponse,
                spirit: {
                    name: deadPerson.full_name,
                    status: deadPerson.death.status
                }
            });
        } else {
            return NextResponse.json({ error: 'No response from spirit' }, { status: 500 });
        }

    } catch (error) {
        console.error("Ouija API error:", error);
        return NextResponse.json({ error: 'The spirits are silent' }, { status: 500 });
    }
}

import { Mistral } from '@mistralai/mistralai';
import { NextResponse } from 'next/server';

const client = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY,
});

export async function GET() {
    const genders = ['Male', 'Female'];
    const randomGender = genders[Math.floor(Math.random() * genders.length)];

    const randomAge = Math.floor(Math.random() * (35 - 15 + 1)) + 15;

    const countries = [
        "China", "India", "United States", "Indonesia", "Pakistan", "Brazil", "Russia", "Mexico",
        "Japan", "Philippines", "Egypt", "Vietnam", "DR Congo", "Turkey", "Iran", "Germany", "Thailand",
        "United Kingdom", "France", "Italy", "Myanmar", "South Korea", "Colombia", "Spain",
        "Argentina", "Algeria", "Ukraine", "Canada", "Poland", "Morocco",
        "Saudi Arabia", "Uzbekistan", "Malaysia", "Peru", "Malaysia", "Iraq", "Afghanistan",
        "Nepal", "Yemen", "North Korea", "Taiwan", "Syria", "Sri Lanka", "Romania", "Chile",
        "Netherlands", "Belgium", "Greece", "Portugal", "Sweden"
    ];
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];

    const deathTypes = [
        "Natural Causes (Illness, sudden medical event, etc.)",
        "Violent / Homicide / War-related",
        "Self-inflicted / Mental Health Struggle / Depression-related",
        "Accidental (Drowning, car crash, workplace accident, etc.)"
    ];
    const randomDeathType = deathTypes[Math.floor(Math.random() * deathTypes.length)];

    const statuses = ['Peaceful', 'Vengeful', 'Confused', 'Helpful', 'Malevolent', 'Regretful', 'Playful', 'Sad'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const messages = [
        {
            "role": "user" as const,
            "content": `Generate a completely fictional human identity.

This person must NOT be a real individual, not based on any celebrity, and not traceable to an existing private person.

All details must be realistic, socially plausible, and historically consistent. The life should feel ordinary, grounded, and human — not cinematic, heroic, or dramatic.

The identity must read like someone who could appear in real public records, school archives, or employment history.

⚠️ MANDATORY CONSTRAINTS:
1. GENDER: ${randomGender}
2. AGE AT DEATH: ${randomAge}
3. NATIONALITY/ORIGIN: ${randomCountry}
4. CAUSE OF DEATH CATEGORY: ${randomDeathType}
5. CURRENT SPIRIT STATUS: ${randomStatus}

⚠️ VARIATION RULE (IMPORTANT)
Each generation must significantly differ in:
Socioeconomic upbringing
Education path (academic / vocational / incomplete / etc.)
Industry of work
Personality type
Life outcomes (not all lives improve)
Avoid repeating patterns across generations.

 OUTPUT FORMAT — JSON ONLY
{
  "full_name": "Emily Grace Thompson",
  "gender": "${randomGender}",
  "birth": {
    "year": 1978,
    "city": "Bristol",
    "country": "${randomCountry}",
    "ethnicity": "White British",
    "spoken_languages": ["English"],
    "birth_context": "Born into a working-class family, with both parents employed in local manufacturing jobs."
  },
  "death": {
    "year": 2003,
    "age": ${randomAge},
    "cause": "Car accident",
    "place": "Manchester",
    "circumstances": "Emily was involved in a collision during a rainy evening while driving home from work.",
    "status": "${randomStatus}"
  },
  "short_life_summary": "A detailed, poignant narrative (approx. 5-6 paragraphs). You MUST capture the emotional journey, hidden struggles, small triumphs, and the human weight of their existence. Write to evoke empathy and 'sonder'. ADDITIONALLY, weave in: 1) Specific hopes, ambitions, or future plans that were undeniably cut short. 2) The lingering tragedy or specific void left behind—unfinished works, waiting loved ones, or unkept promises. 3) A slightly dramatic, emotional twist that emphasizes the cruelty or irony of their timing. Balance the dramatic requirements with the grounded realism of their struggles."
}

The 'status' field must match the MANDATORY CONSTRAINT: ${randomStatus}.
Ensure the life summary allows for this status to make sense (e.g., if 'Playful', perhaps they see the irony in their death; if 'Peaceful', perhaps they accepted it; if 'Vengeful', focus on the injustice).

The death year must be in the past. It cannot be the current year or any future year. The person must already be deceased at the time of generation.

All names (person, institutions, companies, cities if fictional) must use English alphabet letters only (A–Z).
Do not use diacritics, accents, or special characters (no é, ö, å, ñ, ç, ü, etc).
If the cultural origin normally uses such characters, transliterate them into basic English letters.`
        }
    ];

    const completionArgs = {
        temperature: 1,
        maxTokens: 2048,
        topP: 1
    };

    try {
        const response = await client.chat.complete({
            messages: messages,
            model: 'mistral-medium-latest',
            ...completionArgs,
            responseFormat: { type: 'json_object' }
        });

        if (response.choices && response.choices.length > 0 && response.choices[0].message.content) {
            const content = response.choices[0].message.content;
            let jsonContent;
            try {
                jsonContent = JSON.parse(content as string);
            } catch (e) {
                console.error("Failed to parse JSON response", e);
                return NextResponse.json({ error: 'Failed to generate valid JSON' }, { status: 500 });
            }
            return NextResponse.json(jsonContent);
        } else {
            return NextResponse.json({ error: 'No response from Mistral' }, { status: 500 });
        }

    } catch (error) {
        console.error("Mistral API error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

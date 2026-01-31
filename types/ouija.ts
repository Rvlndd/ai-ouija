export interface DeadPerson {
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

export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export interface Position {
    x: number;
    y: number;
}

export interface Rotation {
    x: number;
    y: number;
    z: number;
}

export const GET_ID_FOR_CHAR = (char: string): string => {
    if (char === "YES") return "ouija-yes";
    if (char === "NO") return "ouija-no";
    if (char === "GOOD BYE") return "ouija-goodbye";
    return `ouija-char-${char}`;
};

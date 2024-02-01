class EnglishWord {
    id!: number;
    learned_at!: Date;
    word!: string;
    word_japanese!: string;
    phonetic_symbol!: string;
    synonym!: string;
    synonym_japanese!: string;
    example_sentence!: string[];
    description_and_origin!: string;
    user_id!: number;
    created_at!: Date;
    updated_at!: Date;

    constructor(init: Required<EnglishWord>) {
        Object.assign(this, init);
    }

    static fromJson(json: Record<string, any>): EnglishWord {
        return new EnglishWord({
            id: json["id"],
            word: json["word"],
            word_japanese: json["word_japanese"],
            phonetic_symbol: json["phonetic_symbol"],
            synonym: json["synonym"],
            synonym_japanese: json["synonym_japanese"],
            example_sentence: json["example_sentence"],
            description_and_origin: json["description_and_origin_japanese"] || json["description_and_origin"],
            learned_at: new Date(json["learned_at"]),
            created_at: new Date(json["created_at"]),
            updated_at: new Date(json["updated_at"]),
            user_id: json["user_id"],
        });
    }
}

export enum Situation {
    Daily = "日常会話",
    Business = "ビジネス会話",
}


export enum ConversationStyle {
    Casual = "カジュアル",
    Formal = "フォーマル",
}


export enum Difficulty {
    Easy = "簡単",
    Normal = "普通",
    Hard = "難しい",
}


export enum VocabularyType {
    Word = "単語",
    Sentence = "短文",
    Idiom = "イディオム",
}

export default EnglishWord;
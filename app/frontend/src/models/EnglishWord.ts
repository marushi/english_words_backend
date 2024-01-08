class EnglishWord {
    id!: number;
    learnedAt!: Date;
    word!: string;
    userId!: number;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(init: Required<EnglishWord>) {
        Object.assign(this, init);
    }

    static fromJson(json: Record<string, any>): EnglishWord {
        return new EnglishWord({
            id: json["id"],
            word: json["word"],
            learnedAt: new Date(json["learned_at"]),
            createdAt: new Date(json["created_at"]),
            updatedAt: new Date(json["updated_at"]),
            userId: json["user_id"],
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
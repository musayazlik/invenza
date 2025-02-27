export type ModelType = "gemini" | "gpt";

export interface Source {
  id: string;
  title: string;
  url?: string;
  content: string;
  similarity?: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model: ModelType;
  timestamp: string;
  itemReferences?: {
    name: string;
    code?: string;
  }[];
  sources?: Source[];
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  model: ModelType;
  timestamp: string;
}

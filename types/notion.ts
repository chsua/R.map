export interface EssenceNotion {
  id: number;
  name: string;
}

export interface Notion {
  id: number;
  name: string;
  content: string;
  relatedNotions: EssenceNotion[];
}

export interface RequestNotion {
  name: string;
  content: string;
  relatedNotion: {
    id: number | null;
  };
}

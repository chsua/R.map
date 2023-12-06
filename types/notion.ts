export interface essenceNotion {
  id: number;
  name: string;
}

export interface Notion {
  id: number;
  name: string;
  description: string;
  relatedNotionList: essenceNotion[];
}

export interface RequestNotion {
  name: string;
  description: string;
  isFirst: boolean;
  relatedNotion: {
    id: number;
  } | null;
}

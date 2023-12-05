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

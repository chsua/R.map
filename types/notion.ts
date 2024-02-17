export interface NotionFolder {
  id: number;
  name: string;
  notions: EssentialNotion[];
}

export interface RequestNotionFolder {
  name: string;
}

export interface EssentialNotion {
  id: number;
  name: string;
}

export interface RelevanceNotion {
  id: number;
  name: string;
  relevance: string;
  reverseRelevance: string;
}

export interface Notion {
  id: number;
  name: string;
  notionFolder: {
    id: number;
    name: string;
  };
  content: string;
  relatedNotions: RelevanceNotion[];
}

export interface RequestNotionForPost {
  name: string;
  content: string;
  notionFolderId: number;
  relatedNotion: RequestRelatedNotion | null;
}

export interface RequestNotionForPatch {
  name: string;
  content: string;
}

export interface RequestRelatedNotion {
  id: number;
  relevance: string;
  reverseRelevance: string;
}

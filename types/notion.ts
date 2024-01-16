export interface NotionFolder {
  id: number;
  name: string;
}

export interface RequestNotionFolder {
  name: string;
}

export interface RelatedNotion {
  id: number;
  name: string;
}

export interface Notion {
  id: number;
  name: string;
  content: string;
  relatedNotions: RelatedNotion[];
}

export interface RequestNotionForPost {
  name: string;
  content: string;
  relatedNotion: {
    id: number | null;
  };
}

export interface RequestNotionForPatch {
  name: string;
  content: string;
}

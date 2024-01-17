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

export interface Notion {
  id: number;
  name: string;
  notionFolder: {
    id: number;
    name: string;
  };
  content: string;
  relatedNotions: EssentialNotion[];
}

export interface RequestNotionForPost {
  name: string;
  content: string;
  notionFolderId: number;
  relatedNotion: {
    id: number | null;
  };
}

export interface RequestNotionForPatch {
  name: string;
  content: string;
}

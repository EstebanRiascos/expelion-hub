export interface RequirementFile {
  id: number;
  name: string;
  type: "pdf" | "excel" | "image" | "zip" | "other" | string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  storage_path?: string;
}

export interface RequirementComment {
  id: number;
  author: string;
  company: boolean;
  message: string;
  time: string;
}

export interface RequirementHistoryItem {
  id: number;
  title: string;
  description: string;
  date: string;
  type: "created" | "status" | "file" | "comment" | "completed";
}

export interface Requirement {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdBy: string;
  createdAt: string;
  lastUpdated: string;
  objective: string;
  files: RequirementFile[];
  comments: RequirementComment[];
  history: RequirementHistoryItem[];
}

export interface RecruitmentField {
  role: string;
  count: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  recruitmentStatus: "OPEN" | "CLOSED";
  recruitCount: number;
  category: string;
  author: string;
  createdAt: string;
  deadline: string;
  deletedAt: string | null;
  recruitmentFields: RecruitmentField[];
}
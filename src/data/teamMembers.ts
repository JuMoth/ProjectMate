export interface TeamMember {
  id: number;
  nickname: string;
  role: string;
  introduction: string;
  techStack: string[];
  availability: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    nickname: "개발하는곰",
    role: "frontend",
    introduction:
      "React와 TypeScript를 활용해 사용자 친화적인 웹 서비스를 만들고 싶습니다.",
    techStack: ["React", "TypeScript", "JavaScript"],
    availability: "평일 저녁",
  },
  {
    id: 2,
    nickname: "코딩하는토끼",
    role: "backend",
    introduction:
      "Node.js 기반의 백엔드 개발과 데이터베이스 설계에 관심이 많습니다.",
    techStack: ["Node.js", "Express", "PostgreSQL"],
    availability: "주말",
  },
  {
    id: 3,
    nickname: "디자인새싹",
    role: "designer",
    introduction:
      "사용자 경험을 고려한 UI/UX 디자인과 프로토타이핑을 좋아합니다.",
    techStack: ["Figma", "UI/UX", "Photoshop"],
    availability: "평일 및 주말",
  },
  {
    id: 4,
    nickname: "풀스택도전",
    role: "frontend",
    introduction: "새로운 기술을 배우며 실제 서비스 개발 경험을 쌓고 싶습니다.",
    techStack: ["React", "JavaScript", "CSS"],
    availability: "평일 저녁",
  },
];
interface ProjectSkills {
  id: string;
  name: string;
  category: string;
  order: number;
  ProjectSkills: { projectsId: string; skillsId: string };
}

export interface IProjectInfo {
  id: string;
  userId: string;
  personnel: number;
  projectName: string;
  projectOverView: string;
  role: string;
  startDate: string;
  endDate: Date;
  projectPhoto1: string;
  projectPhoto2: string;
  projectPhoto3: string;
  projectThumb: string;
  inProgress: boolean | null;
  updatedAt: string;
  createdAt: Date;
  Skills: ProjectSkills[];
}

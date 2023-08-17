interface ProjectSkills {
  projectId: string;
  skillsId: string;
}
interface Skills {
  ProjectSkills: ProjectSkills;
  id: string;
  name: string;
  order: number;
  category: string;
}

export default interface IProjectDto {
  id: string;
  projectName: string;
  projectOverView: string;
  projectThumb: string;
  projectPhoto1: string;
  projectPhoto2: string;
  projectPhoto3: string;
  userId: string;
  Skills: Skills[];
}

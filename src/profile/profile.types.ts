export interface ProfileSnapshot {
  name: string
  description: string | null
  skills: SkillSnapshot[]
  experiences: ExperienceSnapshot[]
  projects: ProjectSnapshot[]
}

export interface SkillSnapshot {
  name: string
}

export interface ExperienceSnapshot {
  company: string
  position: string
}

export interface ProjectSnapshot {
  name: string
  description: string | null
  url: string | null
}

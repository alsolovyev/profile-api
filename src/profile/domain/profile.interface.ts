import { Experience } from './experience.interface.js'
import { Project } from './project.interface.js'
import { Skill } from './skill.interface.js'

export interface Profile {
  name: string
  description: string | null
  experiences: Experience[]
  projects: Project[]
  skills: Skill[]
}

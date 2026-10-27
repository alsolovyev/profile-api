import type { Prisma } from '#src/prisma/generated/client.js'

export const testProfile = {
  id: '11111111-1111-4111-8111-111111111111',
  name: 'E2E Test Profile',
  description: 'Profile data for end-to-end tests',
  links: {
    create: [{ label: 'GitHub', url: 'https://example.test' }]
  },
  skills: {
    create: [{ name: 'TypeScript' }]
  },
  experiences: {
    create: [
      {
        company: 'Example Company',
        position: 'Software Engineer',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2022-01-01'),
        achievements: ['Built example features for E2E tests']
      }
    ]
  },
  projects: {
    create: [
      {
        name: 'Example Project',
        description: 'A project used in E2E tests',
        url: 'https://example.test/project'
      }
    ]
  }
} satisfies Prisma.ProfileCreateInput

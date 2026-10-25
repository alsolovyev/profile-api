import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from './generated/client.js'

const user = process.env['POSTGRES_USER']
const password = process.env['POSTGRES_PASSWORD']
const port = process.env['POSTGRES_PORT']
const host = process.env['POSTGRES_HOST']
const db = process.env['POSTGRES_DB']
const profile = {
  id: '11111111-1111-4111-8111-111111111111',
  name: 'Aleksey Solovyev',
  description: 'Backend-азработчик: NestJS, GraphQL, PostgreSQL. Тестовые данные для портфолио.',
  links: {
    create: [
      { label: 'GitHub', url: 'https://github.com/example' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/example' },
      { label: 'Email', url: 'mailto:hello@example.com' }
    ]
  },
  experiences: {
    create: [
      {
        company: 'Acme Corp',
        position: 'Senior Backend Developer',
        startDate: new Date('2022-03-01'),
        endDate: null,
        achievements: [
          'Спроектировал GraphQL API для внутренней платформы',
          'Сократил время ответа ключевых запросов на 40%',
          'Внедрил CI/CD и контейнеризацию сервисов'
        ]
      },
      {
        company: 'Globex LLC',
        position: 'Backend Developer',
        startDate: new Date('2019-06-01'),
        endDate: new Date('2022-02-28'),
        achievements: [
          'Разработал REST и GraphQL сервисы на Node.js',
          'Мигрировал монолит на модульную архитектуру'
        ]
      }
    ]
  },
  projects: {
    create: [
      {
        name: 'Developer Portfolio API',
        description: 'NestJS + GraphQL + Prisma + PostgreSQL, запуск в Docker.',
        url: 'https://github.com/example/portfolio-api'
      },
      {
        name: 'Task Tracker',
        description: 'Небольшой трекер задач с real-time обновлениями.',
        url: null
      }
    ]
  },
  skills: {
    create: [
      { name: 'TypeScript' },
      { name: 'NestJS' },
      { name: 'GraphQL' },
      { name: 'PostgreSQL' },
      { name: 'Prisma' },
      { name: 'Docker' }
    ]
  }
}

const pool = new Pool({
  connectionString: `postgresql://${user}:${password}@${host}:${port}/${db}?schema=public`
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const createdProfile = await prisma.profile.upsert({
    where: { id: profile.id },
    create: profile,
    update: profile
  })

  console.log({ createdProfile })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    await pool.end()
    process.exit(1)
  })

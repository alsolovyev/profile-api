import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from './generated/client.js'

const user = process.env['POSTGRES_USER']
const password = process.env['POSTGRES_PASSWORD']
const port = process.env['POSTGRES_PORT']
const host = process.env['POSTGRES_HOST']
const db = process.env['POSTGRES_DB']

const pool = new Pool({
  connectionString: `postgresql://${user}:${password}@${host}:${port}/${db}?schema=public`
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const name = 'Aleksey Solovyev'

  const existingProfile = await prisma.profile.findFirst({
    where: { name }
  })

  if (existingProfile) {
    return console.log('Profile already created')
  }

  const profile = await prisma.profile.create({
    data: {
      name,
      experiences: {
        create: [{ company: 'SkyEng', position: 'senior frontend developer' }]
      },
      projects: {
        create: [
          {
            name: 'SeeYou',
            description: 'Simple peer-to-peer video call',
            url: 'https://also.alwaysdata.net'
          }
        ]
      },
      skills: {
        create: [
          { name: 'TypeScript' },
          { name: 'Docker' },
          { name: 'NestJS' },
          { name: 'GraphQL' },
          { name: 'PostgreSQL' }
        ]
      }
    },
    include: { skills: true }
  })

  console.log({ profile })
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

import 'dotenv/config'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { Test } from '@nestjs/testing'

import { PrismaClient } from '#src/prisma/generated/client.js'
import { AppModule } from '#src/app.module.js'

import { testProfile } from './fixtures/profile.fixture.js'

describe('Profile', () => {
  let app: INestApplication
  let prisma: PrismaClient

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile()
    const pool = new Pool({
      connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?schema=public`
    })
    const adapter = new PrismaPg(pool)
    prisma = new PrismaClient({ adapter })

    app = moduleRef.createNestApplication()
    await app.init()
  })

  beforeEach(async () => {
    await prisma.profile.deleteMany({ where: { id: testProfile.id } })
    await prisma.profile.create({ data: testProfile })
  })

  afterAll(async () => {
    await prisma.$disconnect()
    await app.close()
  })

  describe('GraphQL', () => {
    describe('QUERY Profile', () => {
      it('should return null if profile does not exists', async () => {
        await prisma.profile.deleteMany({ where: { id: testProfile.id } })

        const response = await request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: `query Profile {
              profile {
                id
              }
            }`
          })

        expect(response.status).toBe(200)
        expect(response.body.errors).toBeUndefined()
        expect(response.body.data.profile).toBeNull()
      })

      it('should successfully return a profile', async () => {
        const response = await request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: `query Profile {
              profile {
                id
                links {
                  label
                  url
                }
                skills {
                  name
                }
                experiences {
                  company
                  position
                  startDate
                  endDate
                  achievements
                }
                projects {
                  name
                  description
                  url
                }
              }
            }`
          })

        expect(response.status).toBe(200)
      })

      it('shoudl return onyl required fields', async () => {
        const response = await request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: `query Profile {
              profile {
                name
                links {
                  label
                }
              }
            }`
          })

        const { links, experiences, projects } = response.body.data.profile

        expect(links).not.toBeUndefined()
        expect(experiences).toBeUndefined()
        expect(projects).toBeUndefined()
      })
    })
  })
})

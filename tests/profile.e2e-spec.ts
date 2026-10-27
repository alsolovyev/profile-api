import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '#src/app.module.js'

describe('Profile', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GraphQL', () => {
    describe('QUERY Profile', () => {
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

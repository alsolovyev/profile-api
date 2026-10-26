import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '#src/app.module.js'
import { Health } from '#src/health/domain/health.interface.js'
import { HealthState } from '#src/health/domain/health-status.enum.js'
import { HealthModel } from '#src/health/models/health.model.js'

describe('Health', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('HTTP', async () => {
    describe('GET /health', () => {
      it('should successfully return the application and database health status', async () => {
        const respons = await request(app.getHttpServer()).get('/health')
        const { status, database, version }: Health = respons.body

        expect(respons.status).toBe(200)
        expect(status).toBe(HealthState.UP)
        expect(database).toBe(HealthState.UP)
        expect(version).not.toBe('')
      })
    })
  })

  describe('GraphQL', async () => {
    describe('QUERY Health', async () => {
      it('should successfully return the application and database health status', async () => {
        const response = await request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: `{
              health {
                status
                timestamp
                uptime
                version
                database
              }
            }`
          })
        const { status, database, version }: HealthModel = response.body

        expect(response.status).toBe(200)
        expect(status).toBe(HealthState.UP)
        expect(database).toBe(HealthState.UP)
        expect(version).not.toBe('')
      })
    })
  })
})

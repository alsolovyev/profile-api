import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '#src/app.module.js'

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

  describe('GET /', () => {
    it('should return html', async () => {
      const response = await request(app.getHttpServer()).get('/')

      expect(response.status).toBe(200)
      expect(response.headers['content-type']).toMatch(/text\/html/)
    })
  })
})

import 'dotenv/config'
import { defineConfig } from 'prisma/config'

const user = process.env['POSTGRES_USER']
const password = process.env['POSTGRES_PASSWORD']
const port = process.env['POSTGRES_PORT']
const host = process.env['POSTGRES_HOST']
const db = process.env['POSTGRES_DB']

export default defineConfig({
  schema: 'src/prisma/schema.prisma',
  migrations: {
    path: 'src/prisma/migrations',
    seed: 'tsx src/prisma/prisma.seed.ts'
  },
  datasource: {
    url: `postgresql://${user}:${password}@${host}:${port}/${db}?schema=public`
  }
})

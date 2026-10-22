import z from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  LOG_LEVEL: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.enum(['verbose', 'debug', 'log', 'warn', 'error', 'fatal']))
    .optional(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_DB: z.string()
})

export type AppConfig = z.infer<typeof envSchema>

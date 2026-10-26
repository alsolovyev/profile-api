import { Controller, Get, Res } from '@nestjs/common'
import { join } from 'node:path'
import type { Response } from 'express'

@Controller()
export class LandingControlle {
  @Get()
  index(@Res() res: Response) {
    res.sendFile('index.html', {
      root: join(process.cwd(), 'src', 'landing', 'html')
    })
  }
}

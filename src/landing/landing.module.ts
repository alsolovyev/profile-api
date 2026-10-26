import { Module } from '@nestjs/common'
import { LandingControlle } from './landing.controller.js'

@Module({
  controllers: [LandingControlle]
})
export class LandingModule { }

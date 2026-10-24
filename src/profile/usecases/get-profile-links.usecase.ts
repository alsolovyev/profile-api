import { Injectable } from '@nestjs/common'

import { ProfileRepository } from '../repositories/profile.repository.js'

import type { Link } from '../domain/link.interface.js'

@Injectable()
export class GetProfileLinksUseCase implements App.UseCase<string, Link[]> {
  constructor(private readonly repository: ProfileRepository) { }

  execute(uuid: string): Promise<Link[]> {
    return this.repository.findProfileLinks(uuid)
  }
}

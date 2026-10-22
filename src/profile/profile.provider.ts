import { Injectable } from '@nestjs/common'

import { Profile } from './models/profile.model.js'

@Injectable()
export class ProfileService {
  get(): Profile {
    return {
      name: 'Aleksey Solovyev',
      description: 'Some description',
      skills: [{ name: 'JS' }],
      experiences: [{ company: 'SkyEnd', position: 'Senior Frontend Developer' }],
      projects: [
        {
          name: 'SeeYou',
          description: 'Simple peer-to-peer video call',
          url: 'https://also.alwaysdata.net'
        }
      ]
    }
  }
}

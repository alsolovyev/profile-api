import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from './generated/client.js'

const user = process.env['POSTGRES_USER']
const password = process.env['POSTGRES_PASSWORD']
const port = process.env['POSTGRES_PORT']
const host = process.env['POSTGRES_HOST']
const db = process.env['POSTGRES_DB']
const profile = {
  id: '11111111-1111-4111-8111-111111111111',
  name: 'Алексей Соловьев',
  description:
    'Full-stack-разработчик и веб-дизайнер с более чем 9-летним опытом проектирования и разработки сайтов и приложений. Специализируюсь на создании выразительных пользовательских интерфейсов с акцентом на визуальную эстетику, анимацию и интерактивность. Работаю с HTML, CSS, JavaScript и современными библиотеками и фреймворками, включая React, Vue.js и Three.js. Образование: ИТМО (ФИТиП); Сертификат: International ESOL B2 Level, английский язык (Langroom LTD, 2016)',
  links: {
    create: [
      { label: 'Email', url: 'mailto:solovyev.a@icloud.com' },
      { label: 'Телефон', url: 'tel:+79992076689' },
      { label: 'Telegram', url: 'https://t.me/alsolovyev' },
      { label: 'WhatsApp', url: 'https://wa.me/79992076689' },
      { label: 'GitHub', url: 'https://github.com/alsolovyev' },
      { label: 'CodePen', url: 'https://codepen.io/janeRivas' }
    ]
  },
  experiences: {
    create: [
      {
        company: 'ООО «Партнер»',
        position: 'Fullstack-разработчик',
        startDate: new Date('2022-03-01'),
        endDate: null,
        achievements: [
          'Совмещаю роли тимлида и технического специалиста, веду проекты полного цикла: от инициации и планирования до выпуска и пострелизной поддержки',
          'Руководил командой из 3 инженеров при разработке B2B SaaS-платформы для автоматизации документооборота. Внедрение CI/CD, собственной системы feature flags и структурированного backlog grooming сократило TTM на 35%',
          'Инициировал и руководил поэтапной миграцией крупного монолита на микросервисную архитектуру, рефакторингом бизнес-логики и внедрением contract testing. Это повысило отказоустойчивость и снизило затраты на поддержку',
          'Участвовал в подборе и адаптации разработчиков и QA для пилотного проекта; выстроил командные процессы: еженедельные стендапы, code review и регулярные синхронизации'
        ]
      },
      {
        company: 'Langroom LTD (SkyEnd)',
        position: 'Frontend-разработчик',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2022-03-01'),
        achievements: [
          'Разработка личного кабинета для учителей и учеников школ и университетов',
          'Автоматизация отправки и проверки домашних заданий, выставления оценок и анализа успеваемости для повышения эффективности обучения и удобства взаимодействия преподавателей и учеников',
          'Переписал унаследованный функционал: скорость загрузки интерфейсов и ответов API выросла до 10 раз',
          'Улучшил UX/UI на основе анализа пользовательских сценариев и обратной связи; оптимизировал навигацию, визуальное восприятие и доступность ключевых функций',
          'Внедрил адаптивную верстку и улучшил совместимость со старыми версиями браузеров и мобильными устройствами',
          'Разработал микросервис на Node.js для автоматической генерации PDF-сертификатов с персонализированными данными, сократив ручной труд административного персонала и стандартизировав выдачу документов',
          'Технологии: Angular, TypeScript, Node.js, Python'
        ]
      },
      {
        company: 'ООО «Аромастар»',
        position: 'Инженер-программист',
        startDate: new Date('2017-01-01'),
        endDate: new Date('2020-01-01'),
        achievements: [
          'Разрабатывал и внедрял программное обеспечение для автоматизации и оптимизации бизнес-процессов',
          'Подбирал технические решения под задачи компании',
          'Обслуживал базу данных и клиент 1С',
          'Настраивал и обслуживал офисное оборудование, включая роутеры и принтеры',
          'Диагностировал и устранял технические проблемы',
          'Технологии: TypeScript, Node.js, Python'
        ]
      }
    ]
  },
  projects: {
    create: [
      {
        name: 'NWCC',
        description:
          'Разработка и редизайн страницы оформления заказа интернет-магазина с автоматизацией заказа, оплаты и доставки. Технологии: Next.js, Python, Bash, MODX, PostgreSQL, Redis, Figma',
        url: 'https://nwcc.ru/checkout'
      },
      {
        name: 'HSE Events (НИУ ВШЭ)',
        description:
          'Платформа для проведения мероприятий и конференций: расписание событий, оперативные уведомления и онлайн-голосования. Мобильное приложение: https://apps.apple.com/us/app/hes-events/id1437185003. Технологии: Vue.js, TypeScript, Jest, Python, Django, PostgreSQL, PHP',
        url: 'https://hse-events.vercel.app'
      },
      {
        name: 'Видеонаблюдение',
        description:
          'Установка и настройка систем видеонаблюдения в загородных домах и офисах; разработка и настройка сервера для доступа к потоковому видео. Технологии: HTML, CSS, TypeScript, RTSP',
        url: null
      },
      {
        name: 'Строй98',
        description:
          'Статический сайт для рекламы услуг по ландшафтным и строительным работам с уведомлениями в Telegram о новых заявках. Технологии: TypeScript, Vite, GitHub Pages, Telegram API, чат-бот на Go',
        url: 'https://строй98.рф'
      },
      {
        name: 'Nunjucks Plugin',
        description:
          'Плагин для Sublime Text с подсветкой синтаксиса Nunjucks, сниппетами и дополнительными функциями. Технологии: RegEx, YAML',
        url: 'https://github.com/alsolovyev/Nunjucks'
      },
      {
        name: 'Twitch Raycast Extension',
        description:
          'Расширение Raycast для просмотра информации о трансляциях, клипах и пользователях Twitch. Технологии: TypeScript, Jest',
        url: 'https://github.com/alsolovyev/twitch-raycast-extension'
      },
      {
        name: 'SeeYou — Video Call',
        description:
          'Веб-приложение для peer-to-peer видеозвонков: создает комнату и ссылку для подключения, позволяет управлять камерой и микрофоном и общаться в чате. Без регистрации и записи звонков',
        url: 'https://also.alwaysdata.net/'
      },
      {
        name: 'LogSense',
        description:
          'Веб-инструмент для разбора и анализа логов: загружает файл с компьютера или по ссылке, показывает сводку по уровням логирования и помогает фильтровать и изучать отдельные записи',
        url: 'https://alsolovyev.github.io/logsense/'
      }
    ]
  },
  skills: {
    create: [
      { name: 'TypeScript' },
      { name: 'Python' },
      { name: 'Go' },
      { name: 'Swift' },
      { name: 'Lua' },
      { name: 'Bash' },
      { name: 'PHP' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'PixiJS' },
      { name: 'Three.js' },
      { name: 'Vue.js' },
      { name: 'Angular' },
      { name: 'Jest' },
      { name: 'Vitest' },
      { name: 'Node.js' },
      { name: '1C' },
      { name: 'Rollup' },
      { name: 'Vite' },
      { name: 'Webpack' },
      { name: 'Gulp' },
      { name: 'WordPress' },
      { name: 'MODX' },
      { name: 'Django' },
      { name: 'Jekyll' },
      { name: 'WebSocket' },
      { name: 'GraphQL' },
      { name: 'gRPC' },
      { name: 'RTSP' },
      { name: 'SQLite' },
      { name: 'Redis' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Docker' },
      { name: 'Git' },
      { name: 'Figma' },
      { name: 'Blender' },
      { name: 'Photoshop' }
    ]
  }
}

const pool = new Pool({
  connectionString: `postgresql://${user}:${password}@${host}:${port}/${db}?schema=public`
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.$transaction([
    prisma.profile.deleteMany({ where: { id: profile.id } }),
    prisma.profile.create({ data: profile })
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    await pool.end()
    process.exit(1)
  })

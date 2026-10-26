# Digital Profile API

Backend и landing-страница цифровой визитки разработчика. NestJS предоставляет профиль, навыки, опыт работы, проекты и профессиональные ссылки через GraphQL; landing загружает эти данные из API. Данные хранятся в PostgreSQL и доступны через Prisma.

## Технологии

- Node.js и TypeScript
- NestJS
- GraphQL и Apollo Server
- Prisma ORM и PostgreSQL
- Docker Compose
- Git

## Запуск через Docker

Рекомендуемый способ запуска из чистого checkout. Compose поднимает PostgreSQL и API, затем генерирует Prisma Client, применяет миграции, заполняет базу начальными данными и запускает Nest в режиме watch.

```bash
cp .env.example .env
make start
```

По умолчанию API доступно по адресу `http://localhost:3000`. GraphQL endpoint и интерактивный интерфейс GraphiQL находятся на `http://localhost:3000/graphql`, HTTP-проверка состояния - `http://localhost:3000/health`.

Полезные команды:

```bash
make logs       # следить за логами контейнеров
make status     # посмотреть состояние сервисов Compose
make stop       # остановить сервисы, сохранив данные БД
make reset      # остановить сервисы и удалить локальный volume БД
```

## Запуск без Docker

Укажите параметры PostgreSQL в `.env` (образец находится в [.env.example](.env.example)), затем выполните:

```bash
npm ci
npm run db:generate
npm run db:migrate:deploy
npm run db:seed
npm run start:dev
```

Чтобы создать миграцию при изменении схемы:

```bash
npm run db:migrate:dev -- --name describe_change
```

## GraphQL API

Откройте `/graphql` в браузере. Основной запрос -- `profile`

```graphql
query Profile {
  profile {
    id
    name
    description
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
}
```

Для проверки состояния приложения доступен GraphQL-запрос:

```graphql
query Health {
  health {
    status
    timestamp
    uptime
    version
    database
  }
}
```

Также можно обратиться к HTTP endpoint:

```bash
curl http://localhost:3000/health
```

## Инициализация данных

Seed-скрипт находится в [`src/prisma/prisma.seed.ts`](src/prisma/prisma.seed.ts). Он создает один профиль и связанные с ним профессиональные ссылки, навыки, места работы и проекты. Для повторяемости используется постоянный UUID.

Compose запускает seed при подготовке приложения. При каждом выполнении скрипт удаляет профиль с этим UUID и связанные записи, а затем создает их заново в транзакции. Поэтому ручные изменения этого профиля будут сброшены при следующем запуске seed.

## Структура проекта

```text
src/
├── config/       проверка переменных окружения и конфигурация
├── graphql/      настройка GraphQL и форматирование ошибок
├── health/       HTTP- и GraphQL-проверки состояния
├── landing/      HTML-визитка
├── logger/       логгер приложения и HTTP middleware
├── prisma/       схема Prisma, миграции, сервис и seed
└── profile/      домен профиля, модели, resolver, use cases и repository
```

## Конфигурация

Скопируйте `.env.example` в `.env`. Обязательные переменные PostgreSQL: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT` и `POSTGRES_DB`. Для `PORT` задано значение по умолчанию `3000`.

В Compose host и port базы данных внутри контейнеров переопределяются. Для production задайте надежный пароль и храните переменные окружения в настройках/секретах платформы.

## Команды проверок

```bash
npm test       # unit-тесты
npm run build  # сборка приложения
make test      # e2e-тесты с временным контейнером PostgreSQL
```

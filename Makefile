COMPOSE_DEV ?= docker compose -f docker-compose.dev.yaml --env-file .env
COMPOSE_PROD ?= docker compose -f docker-compose.prod.yaml --env-file .env
COMPOSE_TEST ?= docker compose -f docker-compose.test.yaml

help: ## Show list of commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
	  awk 'BEGIN{FS=":.*?## "}{printf "  \033[36m%-9s\033[0m %s\n", $$1, $$2}'

start: ## Start dev 
	$(COMPOSE_DEV) up --build

stop: ## Stop dev 
	$(COMPOSE_DEV) down

reset: ## Stop and delete the db data 
	$(COMPOSE_DEV) down -v

test: ## Run tests
	$(COMPOSE_TEST) up --build --exit-code-from e2e --no-attach db; code=$$?; $(COMPOSE_TEST) down -v; exit $$code

build: ## Rebuild the image
	$(COMPOSE_DEV) build 

migration: ## Create a migration 
	@test -n "$(NAME)" || { echo "Provide a migration name: make migration NAME=add_users"; exit 1; }
	$(COMPOSE_DEV) exec api npm run db:migrate:dev -- --name $(NAME)

seed: ## Seed the db with demo data manually
	$(COMPOSE_DEV) exec api npm run db:seed

logs: ## Show logs 
	$(COMPOSE_DEV) logs -f --tail=100

shell: ## Open a PostgreSQL shell
	$(COMPOSE_DEV)  exec db sh -c 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"'

status: ## Show what is running
	$(COMPOSE_DEV) ps

release: ## Build the production images
	$(COMPOSE_PROD) up -d --build

release-logs: ## Show logs
	$(COMPOSE_PROD) logs -f --tail=100

release-stop: ## Stop production
	$(COMPOSE_PROD) down

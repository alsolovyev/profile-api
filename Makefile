help: ## Show list of commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
	  awk 'BEGIN{FS=":.*?## "}{printf "  \033[36m%-9s\033[0m %s\n", $$1, $$2}'

start: ## Start dev 
	docker compose up --build

stop: ## Stop dev 
	docker compose down

reset: ## Stop and delete the db data 
	docker compose down -v

build: ## Rebuild the image
	docker compose build 

migration: ## Create a migration 
	@test -n "$(NAME)" || { echo "Provide a migration name: make migration NAME=add_users"; exit 1; }
	docker compose exec api npm run db:migrate:dev -- --name $(NAME)

logs-api: ## Show the api logs 
	docker compose logs -f --tail=100 api

logs-db: ## Show the api logs 
	docker compose logs -f --tail=100 db

shell: ## Open a PostgreSQL shell
	docker compose  exec db sh -c 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"'

status: ## Show what is running
	docker compose ps

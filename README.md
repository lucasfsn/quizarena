# Quizarena

## Prerequisites

- Python `pipx`

```bash
sudo apt install pipx
pipx ensurepath
```

## Pre-push / pre-commit hooks

We use `pre-commit` to run checks before pushing.

Install via pipx:

```bash
pipx install pre-commit
pre-commit install --hook-type pre-push
```

Manually run the hooks:

```bash
pre-commit run --all-files --hook-stage pre-push
```

## Run Locally

1. Clone the project:

```bash
git clone https://github.com/lucasfsn/quizarena
cd quizarena
```

2. Create `.env` file to set environment variables. Use the provided `.env.example` file as a reference.

3. Build and run the application using Docker Compose:

```bash
  docker compose -f docker-compose.dev.yml up --build --watch
```

## Branching & PR naming

Use kebab-case for branch names and lowercase text. Format:
`type/short-task-title`

Examples for `type`:

- feat — new feature
- fix — bug fix
- chore — configuration, technical tasks, or miscellaneous changes that don’t fit other categories
- docs — documentation changes
- refactor — code changes without adding features or fixing bugs
- test — everything related to tests

PR titles follow (also lowercase):
`type: short task title`

Example:

```
feat: add user profile endpoint
```

# Project

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/lucasfsn/team-project.git
```

## Pre-push setup

1. Install pipx

```bash
sudo apt install pipx
pipx ensurepath
```

2. Install pre-commit using pipx:

```bash
pipx install pre-commit
```

3. Install the git pre-push hook:

```bash
pre-commit install --hook-type pre-push
```

4. Verify the hook runs and see linter output:

```bash
pre-commit run --all-files --hook-stage pre-push
```

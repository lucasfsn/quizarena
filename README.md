# Quizarena

Multiplayer platform that allows you to easily create and play real-time quizzes.

## Contents

- [Contents](#contents)
- [Overview](#overview)
    - [Main Features](#main-features)
    - [Technologies Used](#technologies-used)
- [Run Locally](#run-locally)
- [Contact](#contact)

## Overview

![Home](https://i.ibb.co/xS0PKdy1/quizarena.png)

### Main Features

- **Quizzes**: Create your own challenges and browse a vast library of community-made quizzes.
- **Gameplay**: Host private game sessions and invite friends using unique room codes for instant real-time competition.
- **Leaderboard**: Track your progress via global rankings and game-specific summary.
- **User Settings**: Easily update your account details and manage your personal information in one place.
- **Authentication**: Ensure data safety with secure login and role-based authorization powered by Keycloak.

### Technologies Used

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TanStack Query](https://img.shields.io/badge/-TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![SpringBoot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)
![Stomp](https://img.shields.io/badge/STOMP-000000?style=for-the-badge&logo=stomp&logoColor=white)

## Run Locally

Clone the project

```bash
  git clone https://github.com/lucasfsn/quizarena
```

Go to the project directory

```bash
  cd quizarena
```

Create `.env` file to set environment variables. Use the provided `.env.example` file as a reference.

Build and run the application using Docker Compose:

```bash
  docker compose -f docker-compose.dev.yml up --build --watch
```

The --watch flag enables automatic reload of the server when source files change.

Once started, the application will be available at:
http://localhost:4200

## Contact

For questions please contact [lukasz.nowosielski02@gmail.com](mailto:lukasz.nowosielski02@gmail.com)

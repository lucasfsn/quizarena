# Project file structure

```bash
/app
├── core
│ ├── interceptors/
│ ├── guards/
│ └── user.service.ts
├── shared
│ ├── components
│ │ └── navbar/
│ ├── directives
│ ├── pipes
│ └── constants
├── features
│ ├── game
│ │ ├── components
│ │ ├── services
│ │ ├── pages
│ │ ├── resolvers
│ │ ├── types
│ │ └── game.routes.ts
│ │ └── game.ts
│ │ └── game.html
│ │ └── game.scss
│ └── state
│ │ │ ├── reducers
│ │ │ │ └── user.reducer.ts
│ │ │ └── actions
│ │ │ │ └── user.actions.ts
```

- **core**: singleton services (services that are shared across app), guards, interceptors.
- **shared**: reusable components, directives, pipes, utils, validators, constants, layouts etc.
- **features**: each feature in its own folder (with its components, services, resolvers, types, route file, page files and so on).
- features/**state**: application state management with all reducers and actions

# Project file structure

```bash
/app
├── dev/
├── core
│ ├── interceptors/
│ ├── guards/
│ └── auth/
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
│ │ │ │ └── game.reducer.ts
│ │ │ └── actions
│ │ │ │ └── game.actions.ts
```

- **dev**: helper directory for development — contains example usages (e.g.
  modal demos), mock/dummy data, utility scripts and demo implementations. Not
  intended for production code.
- **core**: singleton services (services that are shared across app such as
  AuthService), guards, interceptors.
- **shared**: reusable components, directives, pipes, utils, validators,
  constants, layouts etc.
- **features**: each feature in its own folder (with its components, services,
  resolvers, types, route file, page files and so on).
- features/**state**: application state management with all reducers and actions

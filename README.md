# Test task

## Prerequirements
Install Node.js v18 or v20 (LTS)

After this run commands:
- `corepack enable` // to enable yarn binary
- `yarn install` // to install dependencies

## Used dependencies

- React
- MobX - used in `/src/features/persons-list/...`
- Ant Design - tokens overrided in `/src/config/antdTokens.ts`
- Ant Design Chart
- Styled Components - mostly used in layout component: `src/layouts/default/index.tsx`, Ant Design tokens were passed to theme: `src/app/themeProvider.tsx`
- Faker.js - for generating fake data

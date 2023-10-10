# Surge Backend v1

# Setup

## Environment Variables

1. Copy `.env.example`, and rename to `.env`
2. Configure newly copied `.env` file

## Development

> This project was setup using Node.js v18.5.

1. Install dependencies with `npm install`
2. Start developoment server with `npm run dev`

## Production

Production build is compiled first into JavaScript, built on the `./dist` folder, and can be ran after compilation.

1. Run `npm run build`
2. Run `npm run start`

# Project

Every development files are located within the `./src` folder.

```
├── app.ts
├── config
│   └── db.ts
├── controllers
│   └── user-controller.ts
├── middleware
│   ├── async-middleware.ts
│   ├── auth-middleware.ts
│   └── error-middleware.ts
├── routes
│   └── user-route.ts
├── __tests__
│   └── example.test.ts
├── types
│   ├── enums
│   │   └── enums.common.ts
│   ├── interfaces
│   │   └── interfaces.common.ts
│   └── types
│   │   └──  types.common.ts
│   └── index.d.ts
└── utils
    ├── ApiError.ts
    └── ApiSucess.ts
```

## Important helper functions

### asyncHandler

Passing middleware into the asyncHandler will allow the server to automatically catch any internal server errors, or manually thrown errors from the server.

```js
// ? asyncHandler should be used for every request for easy async handling
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Example user, get from database
    const user = [{ name: "John Doe" }, { name: "Jaen Doe" }];

    // Return json with success message
    res.status(200).json(new ApiSuccess<User[]>(user, "Success!"));
  },
);
```

## ApiError & ApiSucccess

Using ApiError or ApiSuccess allows for consistent responses across all routes; please use this instead of passing your own data structure.

### ApiError

```js
throw new ApiError({}, 500, "Handled by asyncHandler");
```

### ApiSuccess

```js
 res.status(200).json(new ApiSuccess<User[]>(user, "Success!"));
```

## Adding extra path aliases

If you add extra folders to this template and would like to use them with aliases, then go through following:

1. Go into `tsconfig.json`
2. Add extra paths inside of `{ paths: ... }` (for tsconfig-paths)
3. Go into `package.json`
4. Add extra paths inside of `{_moduleAliases: ... }` (for production build)

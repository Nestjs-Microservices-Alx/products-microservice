<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="90" alt="Nest Logo" /></a>
</p>

# Docs
- --- Creamos un resource completo sin tests
  ```sh
    # 1ro creamos 1 REST para entender, ya luego el microservice
    nest g res products --no-spec
  ```
- --- Instlamos las deps q no se instalarion:
  - -- rund: `pnpm add @nestjs/mapped-types`
  

- --- Main.ts configs
  - -- El    Logger
  - -- El    Global prefix





      https://docs.nestjs.com/techniques/database




- --- `DTO`
  - -- Para validarlo instalamos:  `pnpm add class-validator class-transformer`
    - Aplicamos las validaciones en el DTO
    - Registramos el `ValidationPipe()` en el  `main.ts`




- --- Configurar las `Environment Variables` -> `.env`   <--- Esta es la mas usada para REST, pero para `Microservices` complica un poco las cosas, asi q se usa otra forma
  - Para microservices por facilidad NO se usa el ConfigModule ni el `ConfigService` xq sino se tiene q cargar config serve async y cosas medias raras/complejas
  - ya NOOOOO Requiere algunas dependencies   `pnpm add @nestjs/config`

  - --- Enfoque en Microservices: Aqui uso joi por las risas :v, en el repo uso zod
    - -- Install:     `pnpm add dotenv joi`
    - -- Creamos el   `envs.ts`    en el  /config   <--  creamos el .env tb
    - -- En el   `main.ts`   lo usamos y ya, sin configs especiales







<!-- /* ================================================================ -->
### Documentar con OpenAPI
-- Documentacion - OpenAPI: https://docs.nestjs.com/openapi/introduction
  - Instalamos dependencias:    `pnpm add @nestjs/swagger`

  - OpenAPI es el Standar, Swagger es la implementacion
    - Configuramos en el      `main.ts`
      - Crea el cascaron vacio de la doc en  /api
```js
  // // docs    <---   main.ts
  const config = new DocumentBuilder()
    .setTitle('Teslo example')
    .setDescription('Tesloshop REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // endpoint  /api
```

  - Debemos empezar a definir como luce cada enpoint/dto para la doc
    - @ApiTags('Products'): Separar x tags  en el Controller
      -  @ApiResponse({ status: 201, description: 'Product was created' , type: Product})
    - @ApiProperty({})  en la Entity/DTO

  - -- Tengo mi propio decorador







<!-- ========================================================================================== -->
## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

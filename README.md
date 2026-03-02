# LoginFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# 🔐 Frontend Login Angular

Frontend desarrollado en **Angular 18** para el sistema de autenticación [backend-login-ruby](https://github.com/jose8951/backend-login-ruby). Conectado a una API REST en Ruby on Rails con base de datos PostgreSQL desplegada en Render.

---

## 🚀 Tecnologías

- Angular 18 (Signals, Standalone Components)
- Bootstrap 5
- TypeScript
- RxJS

---

## ✨ Funcionalidades

- **Login** con validación y guard de seguridad (`authGuard`)
- **Dashboard** con CRUD completo de usuarios
  - Crear, editar, eliminar usuarios
  - Activar / desactivar usuarios
  - Selección de fila para editar desde el formulario
- **Pokémon** — listado con imágenes y buscador por nombre
- **Super Héroes** — listado de personajes
- **Navbar** reutilizable con usuario autenticado y cierre de sesión
- Notificaciones toast en tiempo real
- Diseño responsive con Bootstrap

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── navbar/
│   │   ├── pokemon/
│   │   └── superheroes/
│   ├── guards/
│   │   └── auth-guard.ts
│   ├── models/
│   │   ├── usuario.ts
│   │   ├── credenciales.ts
│   │   └── pokemon.ts
│   └── services/
│       └── auth.ts
└── assets/
    └── pokemon.json
```

---

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jose8951/frontend-login-angular.git

# Entrar al directorio
cd frontend-login-angular

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

Abre el navegador en `http://localhost:4200`

---

## 🔗 Conexión con el Backend

Este proyecto consume la API REST de [backend-login-ruby](https://github.com/jose8951/backend-login-ruby) desplegada en:

```
https://backend-login-ruby.onrender.com
```

Endpoints utilizados:

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /login | Autenticación de usuario |
| GET | /users | Listar usuarios |
| POST | /users | Crear usuario |
| PUT | /users/:id | Actualizar usuario |
| DELETE | /users/:id | Eliminar usuario |

---

## 👤 Usuario de prueba

```
Email: root@test.es
Password: root1234
```

---

## 📦 Build para producción

```bash
ng build
```

---

## 📄 Licencia

MIT


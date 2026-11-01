# TLP 2 - Trabajo Práctico Integrador N° III

## API REST para gestionar usuarios, eventos y categorías

### Tecnologías

- Base de datos MongoDB
- ODM: Mongoose
- JWT
- Cookies
- Bcrypt
- Express-validator,

## Riveros Diego Fernando

## Relaciones

- **1:1 embebida:** User → profile, Event → location
- **1:N referenciada:** User → Event (`organizer`)
- **N:M referenciada:** Event ↔ Category (array `categories` en Event)
- **Virtual populate:** `User.events` y `Category.events`
- **Eliminación lógica:** User (`deletedAt`)
- **Eliminación en cascada:** al eliminar un usuario se borran sus eventos; al eliminar una categoría se quita de los eventos

## Endpoints

| Método              | Ruta                                 | Acceso              |
| ------------------- | ------------------------------------ | ------------------- |
| POST                | /api/auth/register                   | público             |
| POST                | /api/auth/login                      | público             |
| GET / PUT           | /api/auth/profile                    | autenticado         |
| POST                | /api/auth/logout                     | autenticado         |
| GET                 | /api/users, /api/users/:id           | admin               |
| PUT / DELETE        | /api/users/:id                       | admin               |
| POST / GET          | /api/events                          | autenticado         |
| GET                 | /api/events/my, /api/events/:id      | autenticado         |
| PUT / DELETE        | /api/events/:id                      | organizador o admin |
| GET                 | /api/categories, /api/categories/:id | autenticado         |
| POST / PUT / DELETE | /api/categories                      | admin               |

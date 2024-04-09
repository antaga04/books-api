# Proyecto MERN 7

API de libros y reviews. Continiene una lista de libros. Sobre ellos hay reviews hechas por un User autenticado el la base de datos.

API_URL => https://magicbooks.onrender.com/api/books

## MODELOS

```javascript
const Book = {
  _id: 'id_de_mongoDB',
  title: 'nombre_del_libro',
  author: 'autor_del_libro',
  genre: 'género_del_libro',
  publication_year: 'año_de_publicación',
  cover: 'imagen_del_libro',
};

const Review = {
  _id: 'id_de_mongoDB',
  user_id: 'id_user_que_comenta',
  book_id: 'id_book_comentado',
  rating: 'puntuación_del_libro',
  comment: 'comentario_del_libro',
};

const User = {
  _id: 'id_de_mongoDB',
  name: 'nombre_del_user',
  avatar: 'avatar_del_user', // será subido como file y se guardará en Cloudinary
  email: 'email_del_user',
  password: 'contraseña_del_user',
  favourites: ['lista', 'books', 'favoritos'],
  rol: 'imagen_del_libro',
};
```

### Tener en cuenta:

1. No Todos los campos son requeridos, pero se agradece que se suban todos.
2. La imagen del Screenshot admite un peso máximo de 1mb.
3. La imagen se sube como archivo. Esta se guardará en Cloudinary automáticamente.

## URLs:

- https://localhost:9000/api
- https://magicbooks.onrender.com/api

### MODELO BOOKS:

| HTTP Request | Endpoint  | Description                       | Protected |
| ------------ | --------- | --------------------------------- | --------- |
| GET          | /books    | Todos los libros registrados.     | No        |
| GET          | /books/id | Libro por su id.                  | No        |
| POST         | /books    | Crear un nuevo libro.             | Sí        |
| PUT          | /books/id | Editar un libro.                  | Sí        |
| DELETE       | /books/id | Borrar un libro.                  | Sí        |

### MODELO REVIEWS:

| HTTP Request | Endpoint  | Description                       | Protected |
| ------------ | --------- | --------------------------------- | --------- |
| GET          | /reviews    | Todas las reviews registrados.  | No        |
| GET          | /reviews/id | Review por su id.               | No        |
| POST         | /reviews    | Crear una nueva review.         | Sí        |
| PUT          | /reviews/id | Editar una review.              | Sí        |
| DELETE       | /reviews/id | Borrar una review.              | Sí        |

### MODELO USERS:

| HTTP Request | Endpoint       | Description                       | Protected |
| ------------ | -------------- | --------------------------------- | --------- |
| GET          | /auth          | comprobar si tiene token válido   | No        |
| POST         | /auth/login    | Login user                        | No        |
| POST         | /auth/register | Registrar user (crear).           | No        |
| PUT          | /auth/avatar   | Actualizar user avatar.           | Sí        |
| PUT          | /auth/         | Actualizar user con bearer token  | Sí        |

## Aclaraciones

- Si el endpoint es 'Protected' será necesario un estar registrado como User.
- Para acceder a los endpoints 'Protected' se usará un Bearer token.
- En el primer endpoint del Modelo Book, agregando uno o más Query Params se puede filtrar por los atributos del modelo Book. Por ejemplo: http://localhost:9000/api/books?title=Pri&author=Ray.
- Para probar todos los endpoints se puede usar el User guest.

```javascript
{
  "userName": "guest",
  "password": "$Sandstorm4"
}
```

### > Para cualquier duda puedes contartarme al email antaga04@gmail.com :)

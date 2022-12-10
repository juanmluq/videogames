
#  Project Videogames


## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.

## Iniciar

Clona el repositorio y haz `npm install` y `npm start` en la carpeta client y api. 

ya puedes usar la página!


## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.

Adicionalmente será necesario que creen desde psql una base de datos llamada `videogames`

El contenido de `client` fue creado usando: Create React App.


Se creo la aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella se puede, entre otras cosas:

  - Buscar videjuegos
  - Filtrarlos / Ordenarlos
  - Agregar nuevos videojuegos

__IMPORTANTE__: Para poder utilizar esta API externa es necesario crearse una cuenta para obtener una API Key que luego debera ser incluida en todos los request que hagamos a rawg simplemente agregando `?key={YOUR_API_KEY}` al final de cada endpoint. Agregar la clave en el archivo `.env` para que la misma no se suba al repositorio por cuestiones de seguridad y utilizarla desde allí.


#### Tecnologías necesarias:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

La aplicación contiene las siguientes pantallas/rutas.

- **'/'** : Landing Page con un botón para ingresar al home (`Ruta principal`) y un boton para loguearme.
- **'/home'** : Nuestra Home donde se van a ver todos los videogames.
- **'/home/ID'** : El detalle del videogame.
- **'/videogame'** : Sirve para crear un videogame.



![home videogames](https://user-images.githubusercontent.com/94568781/206865210-459374b5-4b88-4caf-87a8-ef27ba18bfd4.jpg)


__Ruta principal__: 
- [ ] Input de búsqueda para encontrar videojuegos por nombre
- [ ] Área donde se ve el listado de videojuegos. Se muestra su:
  - Imagen
  - Nombre
  - Géneros
- [ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético
- [ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 6 juegos por pagina, mostrando los primeros 6 en la primer pagina.


__Ruta de detalle de videojuego__: contiene:
- [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
- [ ] Descripción
- [ ] Fecha de lanzamiento
- [ ] Rating
- [ ] Plataformas

__Ruta de creación de videojuegos__: contiene:
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
- [ ] Posibilidad de seleccionar/agregar varios géneros
- [ ] Posibilidad de seleccionar/agregar varias plataformas
- [ ] Botón/Opción para crear un nuevo videojuego


#### Base de datos

El modelo de la base de datos contiene las siguientes entidades:

- [ ] Videojuego con las siguientes propiedades:
  - ID 
  - Nombre 
  - Descripción 
  - Fecha de lanzamiento
  - Rating
  - Plataformas 
- [ ] Genero con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos ya que un videojuego puede pertenecer a varios géneros en simultaneo y, a su vez, un género puede contener múltiples videojuegos distintos. Un ejemplo sería el juego `Counter Strike` pertenece a los géneros Shooter y Action al mismo tiempo. Pero a su vez existen otros videojuegos considerados como Shooter o como Action.


#### Backend

Se desarrollo el servidor en Node/Express con las siguientes rutas:

- [ ] __GET /videogames__:
  - Obtiene un listado de los videojuegos
  - Devuelve solo los datos necesarios para la ruta principal
- [ ] __GET /videogames?name="..."__:
  - Obtiene un listado de las primeros 6 videojuegos que contengan la palabra ingresada como query parameter.
  - Si no existe ningún videojuego muestra un mensaje de error.
- [ ] __GET /videogame/{idVideogame}__:
  - Obtiene el detalle de un videojuego en particular
  - Trae solo los datos pedidos en la ruta de detalle de videojuego
  - Incluye los géneros asociados
- [ ] __GET /genres__:
  - Obtiene todos los tipos de géneros de videojuegos posibles
  - En una primera instancia los trae desde rawg y los guarda en su propia base de datos para luego ya utilizarlos desde allí
- [ ] __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos

  - [ ] __GET /inicio__:
  - Pantalla de inicio para loguearme.

  - [ ] __GET /login__:
  - Pantalla de login

- [ ] __POST /login__:
  - Ingresar al home 

  - [ ] __GET /register__:
  - Pantalla con inputs para registrarse

- [ ] __POST /register__:
  - Post para registrarse

 - [ ] __GET /home__:
  - Pantalla de perfil cliente

- [ ] __POST /logout__:
  - Salir del perfil

# Subidas de Imágenes al servidor

_Sistema básico de subidas de imágenes a un servidor, back-end y front-end separados pero unidos por una Api, sin login ni registro_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

_Cosas que necesitas para que funcione_

```
- Tener instalado Git/GitHub (para clonar el proyecto)
- Tener instalado Nodejs (back/front)
- Tener instalado Npm (back/front)
- Tener instalado MongoDB (back)
```

### Instalación 🔧

_Clonamos el repositoio en nuestro equipo, como vemos, contamos con dos carpetas: Backend y Frontend. Entramos a una carpeta (cualquiera de las dos) y en nuestra consola colocamos el comando_

```
npm install
```

_Lo que hará dicho comando es instalar las dependencias que necesita nuestro proyecto para su correcta ejecución_

_Luego dentro de cada carpeta se encuentra un archivo .env, contiene las variables de entorno que necesita, tanto el backend como el frontend, para saber el valor de cada variable_
_Backend:_
```
PORT=500
```
_El puerto por donde va a correr el servidor que contendrá la Api_

```
DB_HOST=localhost
DB_NAME=nombre
PORT_DB=27017
PASS_DB=""
```
_DBHOST: Host o Dirección (o en algunos casos IP) de donde se encuentra nuestra base de datos._
_DBNAME: Nombre de nuestra base de datos que contrendrá todas las tablas._
_PORTDB: Puerto de la base de datos, en este caso mongodb por defecto usa el puerto 27017._
_PASSDB: Contraseña de la base de datos_

_Una vez configurado nuestro Back, ya está listo para ser ejecutado, lo hacemos con el comando_
```
npm run dev
```

_Frontend:_

```
API=http://localhost:5000
```
_API: Dirección de donde se encuentra la api, pueden ser números IP en algunos casos_

_Una vez configurado nuestro Front, ya está listo para ser ejecutado, lo hacemos con el comando_
```
npm run dev
```

## Construido con 🛠️

_Herramientas utilizadas_

* [NodeJs](https://nodejs.org/es/) - Entorno de ejecución
* [MongoDB](https://www.mongodb.com/es) - Base de datos
* [NPM](https://www.npmjs.com/) - Manejador de dependecias
* [EJS](https://ejs.co/) - Template utilizado en el Frontend
* [Express](http://expressjs.com/) - Librería utilizada en el Backend

---
Por [Franco Aranda](linkedin.com/in/franco-aranda-054a911b6) 😊
## Repositorio de Node

* Instalar dependencias ejecutanto el comando:
``` npm install ```

## Subir REST Server a Heroku

* Ejecutar ``` heroku create ``` | Crea el repositorio en heroku
* Modificar el package.json | Agregar en la sección scripts ``` "start": "node server/server.js" ```
* Ejecutar el comando ``` git push heroku master ``` | Sube los cambios el repositorio de heroku para ser desplegados

## Heroku config - Admin Variables de Configuración

* Crear varibles de configuración ``` heroku config:set <nombre="algo"> ```
* Obtener varibles de configuración ``` heroku config:get nombre ```
* Eliminar varibles de configuración ``` heroku config:unset nombre ```
* Obtenemos todas la variables ``` heroku config ```

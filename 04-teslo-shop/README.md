# Descrición


## Correr en dev

1. Clonar el repositorio
2. Crear una copia del ```.env.template``` uy renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalara dependencias ```npm install```
4. Levantar la base de datos ```docker compose up-d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Correr el proyecto ```npm run dev```
7. 
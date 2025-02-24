# Development

Pasos para levantar la app en desarrollo

1. Levantar Base de datos

```
docker compose up -d
```

2. Crear una copia del .env.template y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Ejecutar `npm i`
5. Ejecutar `npm run dev`
6. Ejecutar
   ```
   npx prisma migrate dev
   npx prisma generate

   ```
7. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

## Nota:
__usuario:__ test1@google.com
__password:__ 123456

# Prisma Commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

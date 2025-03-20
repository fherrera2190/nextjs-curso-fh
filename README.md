
# Next.js: El framework de React para producción

## Descripción

Este repositorio contiene los proyectos desarrollados durante el curso **"Next.js: El framework de React para producción"** de Fernando Herrera. El curso ofrece una introducción completa a Next.js, un framework de React ideal para crear aplicaciones web escalables y de alto rendimiento. A lo largo del curso, exploramos cómo utilizar las principales características de Next.js, como el renderizado del lado del servidor (SSR), la renderización estática (SSG), la optimización del rendimiento, y la gestión de rutas.

## Proyectos desarrollados

### 1. **First Steps**

**Descripción**: Este proyecto marca los primeros pasos en el desarrollo con Next.js. Consiste en una aplicación simple con una página de inicio (Home) y varias rutas, donde aprendemos la diferencia entre **Layout** y **Page**. El enfoque principal fue la comprensión de cómo organizar la estructura de la aplicación y realizar interacciones básicas con datos.

**Tecnologías**:
- Next.js
- React

**Enlace a la demo**: [Demo - First Steps](https://nextjs-curso-fh-01-first-steps.vercel.app/)

---

### 2. **My Dashboard**

**Descripción**: En este proyecto, creamos una aplicación web que permite explorar información sobre Pokémon de manera interactiva. La aplicación se conecta a una API externa para obtener los datos y los usuarios pueden dar "likes" a los Pokémon. El estado se maneja utilizando **Redux Toolkit** y se guarda en **LocalStorage** para persistir los datos. También aprendimos cómo implementar rutas en Next.js para mostrar detalles adicionales de cada Pokémon.

**Tecnologías**:
- Next.js
- React
- Redux Toolkit
- LocalStorage

**Enlace a la demo**: [Demo - My Dashboard](https://nextjs-curso-fh-02-dashboard.vercel.app/)

---

### 3. **Admin Todos**

**Descripción**: Esta aplicación de gestión de tareas permite a los usuarios crear, editar y eliminar tareas. El backend está construido con **Next.js** y **Prisma**, usando **PostgreSQL** como base de datos. La autenticación está gestionada con **Auth.js**, permitiendo iniciar sesión con **GitHub** y **Google**. Además, se desplegó la aplicación usando **Docker** para facilitar la escalabilidad.

**Tecnologías**:
- Next.js
- Prisma
- PostgreSQL
- Auth.js
- Docker

**Enlace a la demo**: [Demo - Admin Todos](https://nextjs-curso-fh-03-admin-todos.vercel.app/)

---

### 4. **Teslo Shop**

**Descripción**: En este proyecto creamos una réplica del sitio web de **Tesla**, utilizando **Next.js** para el frontend, **Prisma** con **PostgreSQL**, y **Docker** para contenedorización. La autenticación está gestionada por **Auth.js**. Además, implementamos un sistema de pagos con **PayPal SDK** y gestionamos el estado de la aplicación con **Zustand**. Las funcionalidades clave incluyen la gestión de productos, el carrito de compras y el pago.

**Tecnologías**:
- Next.js
- Prisma
- PostgreSQL
- Docker
- PayPal SDK
- Zustand
- Auth.js

**Enlace a la demo**: [Demo - Teslo Shop](https://nextjs-curso-fh-teslo-shop.vercel.app/)

---

## Tecnologías y Herramientas

- **Next.js**: Framework de React que optimiza las aplicaciones web, permitiendo renderizado estático y dinámico, optimización automática de recursos y mucho más.
- **React**: Biblioteca principal para la creación de interfaces interactivas.
- **Redux Toolkit**: Herramienta para gestionar el estado global de la aplicación.
- **Prisma**: ORM para trabajar con bases de datos de manera eficiente.
- **PostgreSQL**: Base de datos relacional usada en el proyecto Admin Todos.
- **Auth.js**: Biblioteca para gestionar la autenticación en aplicaciones web.
- **Zustand**: Librería para el manejo del estado global en aplicaciones React.
- **Docker**: Plataforma para la contenedorización de aplicaciones y su despliegue.
- **PayPal SDK**: Herramienta para implementar pagos en línea en el proyecto Teslo Shop.

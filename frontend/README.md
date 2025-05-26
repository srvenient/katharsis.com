This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started (Desarrollo Aislado del Frontend)

Para desarrollar el frontend de manera aislada, puedes utilizar los siguientes comandos. Esto es útil para trabajar en la interfaz de usuario sin necesidad de levantar todo el stack de la aplicación.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) (o el puerto que indique la consola) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Ejecución con Docker (Entorno Full-Stack Integrado)

Para un entorno de desarrollo completo que incluya el backend y la base de datos, se recomienda usar el archivo `docker-compose.yml` ubicado en la raíz del proyecto.

1.  **Asegúrate de tener Docker y Docker Compose instalados.**
2.  **Configura las variables de entorno necesarias** en un archivo `.env` en la raíz del proyecto, como se describe en el `README.general.md` y el `backend/README.md`.
3.  **Levanta todos los servicios:**
    Desde la **raíz del proyecto**, ejecuta:
    ```bash
    docker-compose up -d --build
    ```
    Este comando construirá las imágenes de Docker (si es la primera vez o si hay cambios) y arrancará los servicios del frontend, backend y la base de datos en segundo plano.

4.  **Acceder al Frontend:**
    Una vez levantado, el frontend estará disponible en [http://localhost:3000](http://localhost:3000) (o el puerto que tengas configurado para el servicio del frontend en el `docker-compose.yml`).

## Variables de Entorno

La configuración específica del frontend, como el entorno de ejecución (`local`, `stg`, `prod`), se determina a través de la variable de entorno `NODE_ENV`.

Actualmente, la URL del API backend está configurada directamente en los archivos de configuración dentro de `frontend/src/config/` (por ejemplo, `local.ts`, `stg.ts`, `prod.ts` apuntan a `http://localhost:8000/api/v1/`).

En muchos proyectos Next.js, es una práctica común gestionar la URL del API backend y otras configuraciones sensibles o específicas del entorno mediante variables de entorno con el prefijo `NEXT_PUBLIC_`. Por ejemplo, podrías tener una variable `NEXT_PUBLIC_API_BASE_URL` definida en un archivo `.env.local` dentro del directorio `frontend`. Si bien este proyecto no utiliza este enfoque actualmente para la URL del backend, es importante tenerlo en cuenta para futuras configuraciones o si deseas externalizar esta URL.

## Integración con el Backend

El frontend está diseñado para comunicarse con la API del backend (desarrollada en FastAPI) para obtener, enviar y gestionar datos. Realiza llamadas HTTP a los diversos endpoints expuestos por el backend.

Para más detalles sobre los endpoints del backend, su funcionamiento y cómo interactuar con ellos, consulta:

*   La documentación del backend en `../backend/README.md`.
*   La documentación interactiva de la API (Swagger UI) disponible en `/docs` en la URL base del backend (generalmente `http://localhost:8000/docs` cuando se ejecuta localmente).

## Estructura del Frontend (Breve Resumen)

*   `src/app/`: Contiene las rutas principales y páginas de la aplicación (usando el App Router de Next.js).
*   `src/components/`: Componentes reutilizables de la interfaz de usuario.
*   `src/config/`: Configuración de la aplicación, incluyendo la URL del API backend.
*   `src/services/`: Lógica para interactuar con la API del backend.
*   `src/store/`: Gestión del estado global (si se utiliza alguna librería como Zustand o Redux).
*   `public/`: Archivos estáticos servidos directamente.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

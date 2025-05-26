# Backend

Este directorio contiene el código fuente de la API del backend para el proyecto, desarrollado con FastAPI (Python).

## Funcionalidad Principal

El backend proporciona las siguientes funcionalidades principales:

*   **Autenticación y Autorización:**
    *   Registro de nuevos usuarios.
    *   Inicio de sesión y generación de tokens de acceso (OAuth2 compatible).
    *   Cierre de sesión.
    *   Verificación de token de usuario.
    *   Recuperación y restablecimiento de contraseña.
*   **Gestión de Usuarios:**
    *   (Actualmente, las operaciones CRUD de usuario más detalladas podrían no estar expuestas directamente a través de endpoints específicos en `user_routers.py`, pero la infraestructura base existe. La autenticación ya maneja la creación y verificación de usuarios).

## Instrucciones de Instalación y Ejecución (Local con Docker)

La forma recomendada para ejecutar el backend localmente (junto con el resto de la aplicación) es utilizando Docker Compose.

1.  **Clonar el Repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```

2.  **Configurar Variables de Entorno:**
    Este proyecto utiliza variables de entorno para su configuración. Necesitarás crear un archivo `.env` en la raíz del proyecto. Puedes basarte en las variables definidas en `copier.yml` y requeridas por `docker-compose.yml`. Un archivo `.env.example` sería ideal, pero si no existe, asegúrate de incluir al menos las siguientes variables críticas (reemplaza los valores de ejemplo con tus propios secretos):

    ```env
    # Backend & General
    PROJECT_NAME=MiProyectoFastAPI
    STACK_NAME=mi-proyecto-fastapi
    SECRET_KEY=tu_super_secreto_aqui # Genera uno con: python -c "import secrets; print(secrets.token_urlsafe(32))"
    ENVIRONMENT=local # O dev, prod
    DOMAIN=localhost # Dominio principal donde se accederá la app
    FRONTEND_HOST=http://localhost:3000
    BACKEND_CORS_ORIGINS=["http://localhost:3000","http://localhost:8000"] # Orígenes permitidos para CORS

    # Base de Datos PostgreSQL
    POSTGRES_SERVER=db
    POSTGRES_PORT=5432
    POSTGRES_USER=tu_usuario_pg
    POSTGRES_PASSWORD=tu_contraseña_pg_segura # Genera uno seguro
    POSTGRES_DB=tu_basedatos_pg

    # Email (Opcional, para recuperación de contraseña, etc.)
    SMTP_HOST=smtp.tuservidor.com
    SMTP_USER=tu_usuario_smtp
    SMTP_PASSWORD=tu_contraseña_smtp
    EMAILS_FROM_EMAIL=noreply@tudominio.com

    # Superusuario Inicial
    FIRST_SUPERUSER=admin@example.com
    FIRST_SUPERUSER_PASSWORD=cambiame_esta_contraseña
    ```
    **Nota:** Asegúrate de que el archivo `.env` esté listado en tu `.gitignore` para no subir secretos al repositorio.

3.  **Levantar los Servicios con Docker Compose:**
    Desde la raíz del proyecto, ejecuta:
    ```bash
    docker-compose up -d --build
    ```
    Esto construirá las imágenes (si es la primera vez o si hay cambios) y arrancará los servicios del backend, frontend y la base de datos en segundo plano.

4.  **Acceder al Backend:**
    Una vez levantado, el backend estará accesible en `http://localhost:8000` (o el puerto que hayas configurado).

## Referencia de la API

FastAPI genera automáticamente documentación interactiva para la API, la cual es la forma más actualizada y detallada de explorar los endpoints. Una vez que el backend esté en ejecución (siguiendo los pasos anteriores), puedes acceder a:

*   **Swagger UI:** `http://localhost:8000/docs`
*   **ReDoc:** `http://localhost:8000/redoc`

Los principales grupos de endpoints disponibles son:

*   `/auth`: Endpoints relacionados con la autenticación, registro, manejo de tokens y recuperación de contraseñas.
    *   `POST /auth/login/access-token`
    *   `POST /auth/register`
    *   `POST /auth/logout`
    *   `GET /auth/me`
    *   `POST /auth/password-recovery/{email}`
    *   `POST /auth/reset-password`
*   `/users`: (Actualmente sin endpoints específicos definidos en su router, pero la funcionalidad de usuario es manejada a través del sistema de autenticación).

Para más detalles sobre los parámetros de solicitud, respuestas y modelos de datos, por favor consulta la documentación interactiva en `/docs`.

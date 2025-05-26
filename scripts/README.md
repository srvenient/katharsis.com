# Scripts

Este directorio contiene scripts útiles para diversas tareas de desarrollo, construcción y despliegue del proyecto.

## Scripts Disponibles

A continuación se describe cada uno de los scripts principales:

*   **`build-push.sh`**:
    *   **Ubicación:** `scripts/build-push.sh`
    *   **Descripción:** (Asumido) Este script probablemente se encarga de construir las imágenes de Docker para producción y luego subirlas (push) a un registro de contenedores (ej. Docker Hub, AWS ECR, Google GCR). Generalmente se utiliza como parte de un flujo de Integración Continua/Despliegue Continuo (CI/CD).

*   **`build.sh`**:
    *   **Ubicación:** `scripts/build.sh`
    *   **Descripción:** (Asumido) Este script se utiliza para construir las imágenes de Docker del proyecto, posiblemente para un entorno de producción o pre-producción. A diferencia de `build-push.sh`, podría no incluir el paso de subir la imagen al registro.

*   **`deploy.sh`**:
    *   **Ubicación:** `scripts/deploy.sh`
    *   **Descripción:** (Asumido) Este script se encarga de desplegar el proyecto en un entorno específico (ej. staging, producción). Las acciones exactas dependerán de la infraestructura de despliegue (ej. actualizar servicios en un orquestador como Kubernetes, reiniciar servicios en un servidor, etc.).

*   **`generate-client.sh`**:
    *   **Ubicación:** `scripts/generate-client.sh`
    *   **Descripción:** (Asumido, basado en el nombre) Este script podría generar un cliente de API (SDK) a partir de la especificación OpenAPI del backend (generada por FastAPI). Esto facilitaría la interacción con la API desde el frontend u otros servicios.

*   **`prestart.sh`**:
    *   **Ubicación:** `backend/scripts/prestart.sh`
    *   **Descripción:** Este script se ejecuta antes de que la aplicación principal del backend inicie dentro del contenedor de Docker (como se define en `docker-compose.yml`). Sus tareas comunes incluyen:
        *   Esperar a que la base de datos esté disponible y lista para aceptar conexiones.
        *   Ejecutar migraciones de base de datos (ej. con Alembic, si está configurado).
        *   Crear datos iniciales o ejecutar otras tareas de configuración necesarias antes de que la aplicación FastAPI comience a manejar peticiones.

**Nota:** Las descripciones marcadas como "(Asumido)" se basan en convenciones comunes para nombres de script. Si la funcionalidad real es diferente, esta documentación deberá ser actualizada para reflejarla con precisión.

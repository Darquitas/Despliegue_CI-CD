# Docker universal setup

- Todos los servicios usan el package.json universal en la raíz.
- Los Dockerfile de cada servicio y el gateway están configurados para instalar dependencias desde la raíz.
- Los comandos de inicio llaman a los archivos de cada microservicio desde la raíz.
- Para levantar todo, usa:

    docker compose up --build

- Si tienes problemas de dependencias, ejecuta:

    npm install

  en la raíz antes de construir las imágenes.

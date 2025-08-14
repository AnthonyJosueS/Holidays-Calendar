# README — Holidays Calendar (DB + API + Web)

Guía paso a paso para levantar **Base de Datos (SQL Server)**, **API (Node/Express/Prisma)** y **Web (Vite + Nginx)** con Docker Compose. 
---

## 0) Requisitos
- **Docker Desktop** (Windows/Mac/Linux) — asigna **≥ 4 GB de RAM** (Settings → Resources).
- **PowerShell/Terminal** con acceso al proyecto.

## 1) Estructura del proyecto
El proyecto cuenta con una estructura monorepositorio, por motivo de practicidad y practico para el tamaño del proyecto.
Se encuentran las carpetas divididas por Stack, cada una con su configuracion de docker y sus librerias independientes.

## 2) Variables de entorno (Backend)
Las variables de entorno se van a configurar en el archivo `BackEnd/.env.docker`
el mismo que se ha mantenido y no se ha incluido en el .gitignore para que pueda ser simplemente usado,
sin embargo, si se desea realizar un cambio en los parametros de configuracion, se los debe realizar aqui

## 3) Crear los contenedores y ejecutar los servicios
1. Ejecutar los comandos desde la carpeta raiz, donde se encuentra el archivo docker-compose.yml
2. docker compose build --Construccion de los contenedores
3. docker compose up -d db --Levantar primero la base de datos, en caso de no existir la base, la crea inmediatamente
4. docker compose logs -f db --Revisar los logs y confirmar que ha terminado de crearse y conectarse la base de datos
5. docker compose up -d api web --Levantar api y web

## 4) Rutas de api y web
1. API 
  1.1 http://localhost:3000/api/holiday_types
  1.2 http://localhost:3000/api/holidays?

2. WEB -> http://localhost:8080


## 5) Conexión desde SSMS / Azure Data Studio (GUI)

- **Server**: `localhost,1433`
- **Login**: `sa`
- **Password**: `Pass1998`
- **Database**: `holidays_calendar_db`


## 6) Operaciones comunes

```bash
# Ver logs
docker compose logs -f db
docker compose logs -f api
docker compose logs -f web

# Reiniciar uno o todos
docker compose restart api
docker compose restart web
docker compose restart

# Parar/Apagar
docker compose stop
docker compose down     
docker compose down -v     
```

---

## 8) Resetear la base de datos (empezar de cero)

```bash
docker compose down -v     # borra volumen 'dbdata'
docker compose build db --no-cache
docker compose up -d db
docker compose logs -f db
docker compose up -d api web
```

NOTA: Al cambiar los parametros de la base de datos en docker-compose o .env.docker, se debe asegurar que este cambio se vea reflejado
      en ambos archivos, con las mismas credenciales. Lo mismo con el archivo docker-entrypoint.sh de la carpeta bd
#!/bin/sh
set -e

SA_PASSWORD="${SA_PASSWORD:-Pass1998}"        
DB_NAME="${DB_NAME:-holidays_calendar_db}"
PORT="${MSSQL_TCP_PORT:-1433}"


if [ -x /opt/mssql-tools18/bin/sqlcmd ]; then
  SQLCMD="/opt/mssql-tools18/bin/sqlcmd"
elif [ -x /opt/mssql-tools/bin/sqlcmd ]; then
  SQLCMD="/opt/mssql-tools/bin/sqlcmd"
else
  echo "❌ sqlcmd no encontrado en la imagen"; exit 1
fi

/opt/mssql/bin/sqlservr &

echo "⏳ Esperando SQL Server en localhost:$PORT..."
for i in $(seq 1 60); do
  if $SQLCMD -S "localhost,$PORT" -U sa -P "$SA_PASSWORD" -C -Q "SELECT 1" >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

echo "📦 Aplicando schema.sql..."
$SQLCMD -S "localhost,$PORT" -U sa -P "$SA_PASSWORD" -C -i /docker-entrypoint-initdb.d/schema.sql

echo "✅ Init DB completo. Quedando en foreground..."
wait

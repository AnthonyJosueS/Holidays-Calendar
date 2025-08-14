FROM mcr.microsoft.com/mssql/server:2022-latest

USER root
RUN apt-get update \
 && ACCEPT_EULA=Y apt-get install -y curl gnupg apt-transport-https \
 && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
 && curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list > /etc/apt/sources.list.d/mssql-release.list \
 && apt-get update \
 && ACCEPT_EULA=Y apt-get install -y mssql-tools18 unixodbc-dev \
 && ln -s /opt/mssql-tools18/bin/sqlcmd /usr/local/bin/sqlcmd \
 && rm -rf /var/lib/apt/lists/*


ENV ACCEPT_EULA=Y \
    MSSQL_PID=Developer \
    SA_PASSWORD=Pass1998 \
    DB_NAME=holidays_calendar_db


COPY schema.sql /docker-entrypoint-initdb.d/schema.sql
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 1433
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

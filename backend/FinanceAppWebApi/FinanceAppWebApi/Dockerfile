FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY *.sln ./

COPY backend/movies-rest-api/*.csproj ./backend/movies-rest-api/

RUN dotnet restore

COPY backend/movies-rest-api/. ./backend/movies-rest-api/

WORKDIR /app/backend/movies-rest-api

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/  aspnet:8.0
WORKDIR /app

COPY --from=build /app/backend/movies-rest-api/out .


ENTRYPOINT ["dotnet", "movies-rest-api.dll"]
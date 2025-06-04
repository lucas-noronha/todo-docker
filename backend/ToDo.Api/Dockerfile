# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["backend/ToDo.Api/ToDo.Api.csproj", "ToDo.Api/"]
COPY ["backend/ToDo.Domain/ToDo.Domain.csproj", "ToDo.Domain/"]
COPY ["backend/ToDo.Data/ToDo.Data.csproj", "ToDo.Data/"]

RUN dotnet restore "ToDo.Api/ToDo.Api.csproj"

COPY backend/ToDo.Api/. ToDo.Api/
COPY backend/ToDo.Domain/. ToDo.Domain/
COPY backend/ToDo.Data/. ToDo.Data/

RUN dotnet publish "ToDo.Api/ToDo.Api.csproj" -c Release -o /app/publish

# Etapa final (runtime enxuto)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ToDo.Api.dll"]

# 1. בחר תמונה בסיסית של .NET SDK כדי לבנות את הפרויקט
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# 2. הגדר את ספריית העבודה
WORKDIR /app

# 3. העתק את קבצי ה-.csproj ואת הקבצים הנדרשים
COPY *.csproj ./

# 4. התקן את התלויות של הפרויקט
RUN dotnet restore

# 5. העתק את יתר קבצי הקוד
COPY . ./

# 6. בנה את הפרויקט
RUN dotnet publish -c Release -o out

# 7. עכשיו השתמש בתמונה בסיסית של ASP.NET Core לשלב הריצה
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

# 8. הגדר את פורט החשיפה של השרת
EXPOSE 80
EXPOSE 443

# 9. העתק את הקבצים שנבנו מהשלב הקודם
COPY --from=build /app/out /app

# 10. הגדר את ספריית העבודה
WORKDIR /app

# 11. הפעל את היישום
ENTRYPOINT ["dotnet", "ChinessSale_server.dll"]

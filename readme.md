1. First create database postgresql \n
```DB_URI=postgres://postgres:postgres@localhost:5432/artist_dashboard```
2. Set DB_URI in .env file \n
3. ``` npm install ```
4. ``` npx knex migration:latest ```
5. Create superadmin user \n
``` npx knex seed:run --specific=createAdmin.js ```

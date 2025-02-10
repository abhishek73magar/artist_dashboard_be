1. First create database postgresql 
2. Set DB_URI in .env file 
```DB_URI=postgres://postgres:postgres@localhost:5432/artist_dashboard```
3. ``` npm install ```
4. ``` npx knex migration:latest ```
5. Create superadmin user 
``` npx knex seed:run --specific=createAdmin.js ```

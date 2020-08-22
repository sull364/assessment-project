*** SETUP / INSTALLATION ***
1. npm init -y
2. git init
3. npm i
4. mkdir server (all server files will live in here: server.js, models-sql.js, models-mongo.js, api.js, fileController.js, create.sql)
5. OPTIONAL: mkdir client (all client files will live in here: index.js, style.css)
6. Install dependencies: npm i express nodemon axios mongoose
7. 
8. Install PostgreSQL CLI: brew install postgres
9. Create SQL tables, run following in terminal: psql -d postgres://ligcoylc:Kz8pL4vhJ3E7WHu_jwtHxSLdJUT19Sbg@lallah.db.elephantsql.com:5432/ligcoylc -f create.sql
10. Connect to Mongo:
10. A) Connect via Mongo Shell, run the following:
10. A) 1) Create database user with admin access
10. A) 2) Run in terminal: mongo "mongodb+srv://cluster0.sa2wo.mongodb.net/assessment-project" --username lu0713
10. B) Connect to Mongo via Application
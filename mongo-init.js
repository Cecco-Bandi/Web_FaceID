db.createUser(
    {
        user: "apiuser",
        pwd: "apipassword",
        roles: [ { role: "readAnyDatabase", db: "admin" }, { role: "dbAdminAnyDatabase", db: "admin" }, { role: "userAdminAnyDatabase", db: "admin" }, {role: 'readWrite', db: 'webapp'}]
});
module.exports={
   type: "mysql",
   host: "",
   username: "",
   password: "",
   database: "",
   synchronize: true,
   logging: false,
   entities: [
      "dist/entity/**/*.js"
   ],
   migrations: [
      "dist/migration/**/*.js"
   ],
   subscribers: [
      "dist/subscriber/**/*.js"
   ]
}

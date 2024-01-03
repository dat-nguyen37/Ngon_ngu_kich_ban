module.exports={
    HOST:"localhost",
    PORT: "3306",
    USER:"root",
    PASSWORD:"123456789",
    DB:"do_an",
    dialect: "mysql",
    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    options:{
        encrypt: false,
        trustServerCertificate: true,
    }
}
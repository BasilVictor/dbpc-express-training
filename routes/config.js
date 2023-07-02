let config = function() {
    switch (process.env.NODE_ENV) {
        case 'dev':
            return { 
                database: {
                    host: "localhost",
                    user: "root",
                    password: "password",
                    database: "express_training",
                    multipleStatements: true
                },
                secretKey: "secretKey@123409#JWT"
            };
    }
}

module.exports = new config();
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
                }
            };
    }
}

module.exports = new config();

function createUserTable(con) {
    con.query('CREATE TABLE IF NOT EXISTS user'+
    '(id int NOT NULL AUTO_INCREMENT, '+
    'first_name varchar(100) NOT NULL, '+
    'last_name varchar(100) NOT NULL, '+
    'email varchar(155) NOT NULL, '+
    'password varchar(155),'+
    'weight int, '+
    'height int, '+
    'country varchar(100), '+
    'username varchar(100), '+
    'PRIMARY KEY(id))')
}

function creataBikeTable(con) {
    con.query('CREATE TABLE IF NOT EXISTS bikes'+
    '(id int NOT NULL AUTO_INCREMENT, '+
    'brand varchar(100) NOT NULL, '+
    'model varchar(100) NOT NULL, '+
    'price int NOT NULL, '+
    'PRIMARY KEY(id))')
}

function createUsersBikesTable(con) {
    con.query('CREATE TABLE IF NOT EXISTS usersbikes'+
    '(user_id int NOT NULL, '+
    'bike_id int NOT NULL)')
}

exports.createUserTable = createUserTable
exports.creataBikeTable = creataBikeTable
exports.createUsersBikesTable = createUsersBikesTable


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

function createRunTable(con) {
    con.query('CREATE TABLE IF NOT EXISTS run'+
    '(user_id int NOT NULL, '+
    'pace int NOT NULL, '+
    'racing_shoe varchar(100) NOT NULL, '+
    'training_shoe varchar(100) NOT NULL, '+
    'PRIMARY KEY(user_id))')
}

function createSwimTable(con) {
    con.query('CREATE TABLE IF NOT EXISTS swim'+
    '(user_id int NOT NULL, '+
    'pace int NOT NULL, '+
    'wetsuit varchar(100) NOT NULL, '+
    'PRIMARY KEY(user_id))')
}

exports.createUserTable = createUserTable
exports.creataBikeTable = creataBikeTable
exports.createUsersBikesTable = createUsersBikesTable
exports.createRunTable = createRunTable
exports.createSwimTable = createSwimTable


function createUserTable(con) {
    // Create user table
    con.query('CREATE TABLE IF NOT EXISTS user'+
    '(username varchar(100) NOT NULL, '+
    'first_name varchar(100) NOT NULL, '+
    'last_name varchar(100) NOT NULL, '+
    'email varchar(155) NOT NULL, '+
    'password varchar(255) NOT NULL,'+
    'weight int NOT NULL, '+
    'height int NOT NULL, '+
    'PRIMARY KEY(username))')
}

function creataBikeTable(con) {
    // Create bike table
    con.query('CREATE TABLE IF NOT EXISTS bikes'+
    '(id int NOT NULL AUTO_INCREMENT, '+
    'brand varchar(100) NOT NULL, '+
    'model varchar(100) NOT NULL, '+
    'manfyear int NOT NULL, '+
    'price int NOT NULL, '+
    'PRIMARY KEY(id))')
}

function createUsersBikesTable(con) {
    // Create users bikes table
    con.query('CREATE TABLE IF NOT EXISTS usersbikes'+
    '(username varchar(100) NOT NULL, '+
    'bike_id int NOT NULL)')
}

function createRunTable(con) {
    // Create run table
    con.query('CREATE TABLE IF NOT EXISTS run'+
    '(username varchar(100) NOT NULL, '+
    'pace int NOT NULL, '+
    'racing_shoe varchar(100) NOT NULL, '+
    'training_shoe varchar(100) NOT NULL, '+
    'PRIMARY KEY(username))')
}

function createSwimTable(con) {
    // Create swim table
    con.query('CREATE TABLE IF NOT EXISTS swim'+
    '(username varchar(100) NOT NULL, '+
    'pace int NOT NULL, '+
    'wetsuit varchar(100) NOT NULL, '+
    'PRIMARY KEY(username))')
}

function createEventTable(con) {
    // Create event table
    con.query('CREATE TABLE IF NOT EXISTS event'+
    '(id int NOT NULL AUTO_INCREMENT, '+
    'brand varchar(100) NOT NULL, '+
    'location varchar(100) NOT NULL, '+
    'distance varchar(100) NOT NULL, '+
    'date varchar(100) NOT NULL, '+
    'PRIMARY KEY(id))')
}

function createUsersEvents(con) {
    // create users events table
    con.query('CREATE TABLE IF NOT EXISTS usersevents'+
    '(username varchar(100) NOT NULL, '+
    'event_id int NOT NULL, '+
    'swimTime int NOT NULL, '+
    'T1 int NOT NULL, '+
    'bikeTime int NOT NULL, '+
    'T2 int NOT NULL, '+
    'runTime int NOT NULL)')
}

function createViewForMostPopularBikes(con) {
    con.query(`CREATE OR REPLACE view mostpopularbikes
    AS 
    SELECT b.brand, b.model, b.manfyear
    FROM bikes AS b
    JOIN usersbikes as ub
    ON b.id = ub.bike_id
    GROUP BY b.model
    ORDER BY COUNT(*) DESC LIMIT 10`)
}

exports.createUserTable = createUserTable
exports.creataBikeTable = creataBikeTable
exports.createUsersBikesTable = createUsersBikesTable
exports.createRunTable = createRunTable
exports.createSwimTable = createSwimTable
exports.createEventTable = createEventTable
exports.createUsersEvents = createUsersEvents
exports.createViewForMostPopularBikes = createViewForMostPopularBikes

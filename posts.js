const bcrypt = require('bcrypt')
const helpFunctions = require('./functions/helpFunctions')

function login(req, res, con) {
    con.query('SELECT email, first_name, last_name, username, password from user WHERE email = ?', req.body.email, (err, user) => {
        if (err) throw err

        // Login if valid information
        let correct = helpFunctions.loginUser(user, req, res)

     // Render error message if wrong password or email
     helpFunctions.errorLogin(res, correct)

    })
}

function register(req, res, con) {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email.toLowerCase()
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
    const username = req.body.username

    // Query for checking if email or username exits
    con.query(`SELECT email, username FROM user where email = '${email}' OR username = '${username}'`, (err, userCheck) => {
        if (err) throw err
        
        if (userCheck.length !== 0) { helpFunctions.userAlreadyExists(userCheck, res) } 
        else {

    // create user
    con.query(`INSERT INTO user (first_name, last_name, email, password, username, weight, height) `+
    `VALUES("${first_name}", "${last_name}", "${email}", "${password}", "${username}", 0, 0)`)

        // create run info
        con.query(`INSERT INTO run (username, pace, racing_shoe, training_shoe) VALUES("${username}", 0, "-", "-")`)

        // create swim info
        con.query(`INSERT INTO swim (username, pace, wetsuit) VALUES("${username}", 0, "-")`)

        helpFunctions.holdLogin(req, email, username)

        res.redirect('/')
    }
})
    
}

function addNewBike(req, res, con) {
    if (req.session.username) {
    con.query(`INSERT INTO usersbikes (username, bike_id)
    VALUES("${req.session.username}", ${req.body.bike})`)
    }
    res.redirect(req.get('referer'))
}

function chnageRunInfo(req, res, con) {
    if (req.session.username) {
        let pace = req.body.min * 6 + req.body.sec
        con.query(`UPDATE run SET pace = ${parseInt(req.body.min * 60) + parseInt(req.body.sec)}, 
        racing_shoe = "${req.body.racingShoe}", training_shoe = "${req.body.trainingShoe}" 
        WHERE username = '${req.session.username}'`)
        }
        res.redirect(req.get('referer'))
}

function changeSwimInfo(req, res, con) {
    if (req.session.username) {
        let pace = req.body.min * 6 + req.body.sec
        con.query(`UPDATE swim SET pace = ${parseInt(req.body.min * 60) + parseInt(req.body.sec)}, 
        wetsuit = "${req.body.wetsuit}" 
        WHERE username = "${req.session.username}"`)
        }
        res.redirect(req.get('referer'))
}

function editHeightAndWeight(req, res, con) {
    if (req.session.username) {
        con.query(`UPDATE user SET weight = ${parseInt(req.body.weight)}, 
        height = "${parseInt(req.body.height)}" 
        WHERE username = "${req.session.username}"`)
        }
        res.redirect(req.get('referer'))
}

function addNewEvent(req, res, con) {
    con.query(`INSERT INTO usersevents (username, event_id, swimTime, T1, bikeTime, T2, runTime) 
    VALUES("${req.session.username}", ${req.body.event}, ${req.body.swimTime}, ${req.body.T1}, ${req.body.bikeTime}, ${req.body.T2}, ${req.body.runTime})`)

    res.redirect(req.get('referer'))
}

function logout(req, res) {
    req.session.email = null
    req.session.username = null

    res.redirect('/')
}

exports.login = login
exports.register = register
exports.addNewBike = addNewBike
exports.chnageRunInfo = chnageRunInfo
exports.changeSwimInfo = changeSwimInfo
exports.editHeightAndWeight = editHeightAndWeight
exports.addNewEvent = addNewEvent
exports.logout = logout

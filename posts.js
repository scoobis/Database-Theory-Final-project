const bcrypt = require('bcrypt')

function login(req, res, con) {
    con.query('SELECT email, first_name, last_name, username, password, id from user WHERE email = ?', req.body.email, (err, rows) => {
        if (err) throw err
        
        let corect = true
        // check or else it will crach
        if (rows.length === 1) {
        if (bcrypt.compareSync(req.body.password, rows[0].password)) {
            req.session.email = rows[0].email
            req.session.username = rows[0].username

            corect = false
            res.redirect('/')
        }
     }

     if (corect) {
        res.render('login', {
            message: 'Wrong password or email!'
        })
     }
    })
}

function register(req, res, con) {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email.toLowerCase()
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
    const username = req.body.username

    con.query(`SELECT email, username FROM user where email = '${email}' OR username = '${username}'`, (err, userCheck) => {
        if (err) throw err
        
        // if username or email already exits show that to the user
        if (userCheck.length !== 0) {
            if (userCheck[0].email === email) { res.render('register', {emailExists: 'Email already exists'}) }
            else if (userCheck[0].username = username) { res.render('register', {usernameExists: 'Username already exists'}) }
        } else {
            // Run the below code if that user does not exists

    // create user
    con.query(`INSERT INTO user (first_name, last_name, email, password, username, weight, height) `+
    `VALUES("${first_name}", "${last_name}", "${email}", "${password}", "${username}", 0, 0)`)

    con.query(`SELECT COUNT(id) AS count FROM user`, (err1, user) => {
        if (err1) throw err1

        // create run info
        con.query(`INSERT INTO run (user_id, pace, racing_shoe, training_shoe) VALUES(${user[0].count}, 0, "-", "-")`)
        // create swim info
        con.query(`INSERT INTO swim (user_id, pace, wetsuit) VALUES(${user[0].count}, 0, "-")`)
    })
        req.session.email = email
        req.session.username = username
        res.redirect('/')
    }
})
    
}

function addNewBike(req, res, con) {
    if (req.session.userID) {
    con.query(`INSERT INTO usersbikes (user_id, bike_id)
    VALUES(${req.session.userID}, ${req.body.bike})`)
    }
    res.redirect(req.get('referer'))
}

function chnageRunInfo(req, res, con) {
    if (req.session.userID) {
        let pace = req.body.min * 6 + req.body.sec
        con.query(`UPDATE run SET pace = ${parseInt(req.body.min * 60) + parseInt(req.body.sec)}, 
        racing_shoe = "${req.body.racingShoe}", training_shoe = "${req.body.trainingShoe}" 
        WHERE user_id = ${req.session.userID}`)
        }
        res.redirect(req.get('referer'))
}

function changeSwimInfo(req, res, con) {
    if (req.session.userID) {
        let pace = req.body.min * 6 + req.body.sec
        con.query(`UPDATE swim SET pace = ${parseInt(req.body.min * 60) + parseInt(req.body.sec)}, 
        wetsuit = "${req.body.wetsuit}" 
        WHERE user_id = ${req.session.userID}`)
        }
        res.redirect(req.get('referer'))
}

function editHeightAndWeight(req, res, con) {
    if (req.session.userID) {
        con.query(`UPDATE user SET weight = ${parseInt(req.body.weight)}, 
        height = "${parseInt(req.body.height)}" 
        WHERE id = ${req.session.userID}`)
        }
        res.redirect(req.get('referer'))
}

exports.login = login
exports.register = register
exports.addNewBike = addNewBike
exports.chnageRunInfo = chnageRunInfo
exports.changeSwimInfo = changeSwimInfo
exports.editHeightAndWeight = editHeightAndWeight

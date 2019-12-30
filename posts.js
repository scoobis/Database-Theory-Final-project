const bcrypt = require('bcrypt')

function login(req, res, con) {
    con.query('SELECT email, first_name, last_name, username, password from user WHERE email = ?', req.body.email, (err, rows) => {
        if (err) throw err
        
        let corect = true
        // check or else it will crach
        console.log(rows.length)
        if (rows.length === 1) {
            console.log('inside')
        if (bcrypt.compareSync(req.body.password, rows[0].password)) {
            console.log('correct')
            req.session.email = rows[0].email
            req.session.username = rows[0].username

            corect = false
            res.redirect('/')
        }
     }

     if (corect) {
         console.log('WRONG')
        res.render('login', {
            message: 'Wrong password or email!'
        })
     }
    })
}

function register(req, res, con) {
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
    con.query(`INSERT INTO user (first_name, last_name, email, password, username, weight, height) `+
    `VALUES("${req.body.first_name}", "${req.body.last_name}", "${req.body.email.toLowerCase()}", "${password}", "${req.body.username}", 0, 0)`)
    res.redirect('/')
}

exports.login = login
exports.register = register
const bcrypt = require('bcrypt')

function errorLogin(res, correct) {
    if (correct)
    res.render('login', { message: 'Wrong password or email!'})
}

function loginUser(user, req, res) {
    let correct = true

    // check or else it will crach
    if (user.length === 1) {
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
            this.holdLogin(req, user[0].email, user[0].username)

            correct = false
            res.redirect('/')
        }
     }
     return correct
}

function userAlreadyExists(userCheck, res) {
    if (userCheck[0].email === email) { res.render('register', {emailExists: 'Email already exists'}) }
    else if (userCheck[0].username = username) { res.render('register', {usernameExists: 'Username already exists'}) }
}

function holdLogin(req, email, username) {
    req.session.email = email
    req.session.username = username
}

function renderProfile(user, usersbikes, allBikes, usersEvents, allEvents, res) {
    res.render('profile', {
        username: user.username,
        name: user.first_name +' '+ user.last_name,
        height: user.height,
        weight: user.weight,
        bikeList: usersbikes,
        bikes: allBikes,
        pace: Math.floor(user.runPace / 60)+ ':' +user.runPace % 60,
        trainingShoe: user.training_shoe,
        racingShoe: user.racing_shoe,
        swimPace: Math.floor(user.swimPace / 60)+ ':' +user.swimPace % 60,
        wetsuit: user.wetsuit,
        events: usersEvents,
        allEvents: allEvents
    })
}

function renderStats(res, mostPopularBikes, allUsers, fastestRunners, accessories, mostPopularEvents, fastestSwimmers) {
    res.render('stats', {
        mostPopularBikes: mostPopularBikes,
        allUsers: allUsers,
        fastestRunners: fastestRunners,
        mostPopularWetsuit: accessories[0].wetsuit,
        mostPopularTrainingShoe: accessories[0].training_shoe,
        mostPopularRacingShoe: accessories[0].racing_shoe,
        mostPopularEvents: mostPopularEvents,
        fastestSwimmers: fastestSwimmers
      })
}

exports.errorLogin = errorLogin
exports.loginUser = loginUser
exports.userAlreadyExists = userAlreadyExists
exports.holdLogin = holdLogin
exports.renderProfile = renderProfile
exports.renderStats = renderStats
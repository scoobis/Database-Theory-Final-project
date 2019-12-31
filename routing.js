const queries = require('./functions/queries')


function mainPage (req, res) {

    if (req.session.username) {
      res.redirect(`/profile/${req.session.username}`)
    } else {
      res.render('index')
    }
  }

  function loginPage(res) {
    res.render('login')
  }

  function registerPage(res) {
    res.render('register')
  }

  function profile (req, res, con) {
    // query profiles
    con.query(`SELECT id, first_name, last_name, username, height, weight FROM user WHERE username = ?`, 
    req.originalUrl.substring(9), (err, user) => {
      if (err) throw err

      // query users bikes
      con.query(`SELECT brand, price, model FROM bikes AS b 
       INNER JOIN usersbikes AS ub 
       ON b.id = ub.bike_id
       WHERE ub.user_id = ${user[0].id}`, (err1, usersbikes) => {
        if (err1) throw err1

        // query all bikes if user want to add bikes
        con.query(`SELECT * FROM bikes`, (err2, allBikes) => {
          if (err2) throw err2

      // checking if url have a user
      if (user.length !== 0) {
        if (user[0].username === req.session.username) {
          // if profile is the logged in user

          res.render('profile', {
            username: user[0].username,
            name: user[0].first_name +' '+ user[0].last_name,
            height: user[0].height,
            weight: user[0].weight,
            bikeList: usersbikes,
            bikes: allBikes
    
          })
        } else {
          // if the profile is not the logged in user
      res.render('profile', {
        username: user[0].username,
        name: user[0].first_name +' '+ user[0].last_name,
        height: user[0].height,
        weight: user[0].weight,
        bikeList: usersbikes,
        bikes: allBikes
      })
    }
    } else {
      res.render('index')
    }
  })
})
    })
  }

  exports.mainPage = mainPage
  exports.loginPage = loginPage
  exports.registerPage = registerPage
  exports.profile = profile
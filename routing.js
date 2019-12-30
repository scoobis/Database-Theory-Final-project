
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
    con.query(`SELECT id, first_name, last_name, username, height, weight FROM user WHERE username = ?`, 
    req.originalUrl.substring(9), (err, user) => {
      if (err) throw err

      con.query(`SELECT brand, price, model FROM bikes AS b 
       INNER JOIN usersbikes AS ub 
       ON b.id = ub.bike_id
       WHERE ub.user_id = ${user[0].id}`, (err1, bikes) => {
        if (err1) throw err1

      // checking if url have a user
      if (user.length !== 0) {
        if (user[0].username === req.session.username) {
          // if profile is the logged in user

          res.render('profile', {
            username: user[0].username,
            name: user[0].first_name +' '+ user[0].last_name,
            height: user[0].height,
            weight: user[0].weight,
            bikeList: bikes,
            allBikes: bikes
    
          })
        } else {
          // if the profile is not the logged in user
      res.render('profile', {
        username: user[0].username,
        name: user[0].first_name +' '+ user[0].last_name,
        height: user[0].height,
        weight: user[0].weight,
        bikeList: bikes,
        allBikes: bikes
      })
    }
    } else {
      res.render('index')
    }
  })
    })
  }

  exports.mainPage = mainPage
  exports.loginPage = loginPage
  exports.registerPage = registerPage
  exports.profile = profile
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
    con.query(`SELECT u.id, u.first_name, u.last_name, u.username, u.height, u.weight , r.pace AS runPace, r.training_shoe, r.racing_shoe, s.pace AS swimPace, s.wetsuit
    FROM user AS u
    Inner JOIN run AS r 
    ON r.user_id = u.id
    INNER JOIN swim AS s
    ON s.user_id = u.id
    WHERE username = ?`, 
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
          res.render('profile', {
            username: user[0].username,
            name: user[0].first_name +' '+ user[0].last_name,
            height: user[0].height,
            weight: user[0].weight,
            bikeList: usersbikes,
            bikes: allBikes,
            pace: Math.floor(user[0].runPace / 60)+ ':' +user[0].runPace % 60,
            trainingShoe: user[0].training_shoe,
            racingShoe: user[0].racing_shoe,
            swimPace: user[0].swimPace,
            wetsuit: user[0].wetsuit
    
          })
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
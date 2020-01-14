const helpFunctions = require('./functions/helpFunctions')

function mainPage (req, res) {

    if (req.session.username) { res.redirect(`/profile/${req.session.username}`)
    } else { res.render('index') }
  }

  function loginPage(res) {
    res.render('login')
  }

  function registerPage(res) {
    res.render('register')
  }

  function profile (req, res, con) {

    // query profiles
    con.query(`SELECT u.first_name, u.last_name, u.username, u.height, u.weight, r.pace AS runPace, r.training_shoe, r.racing_shoe, s.pace AS swimPace, s.wetsuit
    FROM user AS u
    JOIN run AS r 
    ON r.username = u.username
    JOIN swim AS s
    ON s.username = u.username
    WHERE u.username = ?`, 
    req.originalUrl.substring(9), (err, u) => {
      if (err) throw err
      const user = u[0]

    // query users bikes
    con.query(`SELECT brand, price, manfyear, model FROM bikes AS b 
    JOIN usersbikes AS ub 
    ON b.id = ub.bike_id
    WHERE ub.username = "${user.username}"`, (err1, usersbikes) => {
      if (err1) throw err1

        // query all bikes if user want to add bikes
    con.query(`SELECT * FROM bikes`, (err2, allBikes) => {
      if (err2) throw err2

    con.query(`SELECT e.brand, e.location, e.distance, e.date, u.swimTime, u.T1, u.bikeTime, u.T2, u.runTime  FROM event AS e
    JOIN usersevents AS u
    ON e.id = u.event_id
    WHERE u.username = "${user.username}"`, (err3, usersEvents) => {
      if (err3) throw err3

        con.query(`SELECT * FROM event`, (err4, allEvents) => {
          if (err4) throw err4

      // checking if url have a user
      if (user.length !== 0) { helpFunctions.renderProfile(user, usersbikes, allBikes, usersEvents, allEvents, res) } 
      else { res.render('index') }
  })
})
})
})
    })
  }

  function statsPage(req, res, con) {

    // most popular bikes limit to 10
    con.query(`SELECT * FROM mostPopularBikes`, (err, mostPopularBikes ) => {
      if(err) throw err

      // all users
      con.query(`SELECT username, first_name, last_name FROM user`, (err1, allUsers) => {
        if (err1) throw err1

        // Fastest runners limit to 10
      con.query(`SELECT u.username, r.pace 
      FROM user AS u
      JOIN run AS r
      ON u.username = r.username
      WHERE r.pace <> 0
      GROUP BY u.username
      ORDER BY r.pace LIMIT 10`, (err2, fastestRunners) => {
        if (err2) throw err2

        // most popular accessories
        con.query(`SELECT s.wetsuit, r.training_shoe, r.racing_shoe
        FROM user AS u
        JOIN swim AS s
        ON u.username = s.username
        JOIN run AS r
        ON r.username = u.username
        GROUP BY u.username
        ORDER BY COUNT(*)`, (err3, accessories) => {
          if (err3) throw err3

          // Most popular events, limit to 10
        con.query(`SELECT e.brand, e.distance, e.location, e.date
        FROM event AS e
        INNER JOIN usersevents As us
        ON us.event_id = e.id
        GROUP BY e.brand, e.distance, e.location, e.date
        ORDER BY COUNT(*)`, (err4, mostPopularEvents) => {
          if (err4) throw err4
        
          // Fastest swimmers, limit to 10
          con.query(`SELECT u.username, s.pace
          FROM user AS u
          JOIN swim AS s
          ON s.username = u.username
          GROUP BY u.username
          HAVING s.pace <> 0
          ORDER BY s.pace LIMIT 10`, (err5, fastestSwimmers) => {
            if (err5) throw err5

            helpFunctions.renderStats(res, mostPopularBikes, allUsers, fastestRunners, accessories, mostPopularEvents, fastestSwimmers)
  })
})
})
})
})
})
  }

  exports.mainPage = mainPage
  exports.loginPage = loginPage
  exports.registerPage = registerPage
  exports.profile = profile
  exports.statsPage = statsPage
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
    con.query(`SELECT u.first_name, u.last_name, u.username, u.height, u.weight, r.pace AS runPace, r.training_shoe, r.racing_shoe, s.pace AS swimPace, s.wetsuit
    FROM user AS u
    Inner JOIN run AS r 
    ON r.username = u.username
    INNER JOIN swim AS s
    ON s.username = u.username
    WHERE u.username = ?`, 
    req.originalUrl.substring(9), (err, u) => {
      if (err) throw err
      const user = u[0]

      // query users bikes
      con.query(`SELECT brand, price, manfyear, model FROM bikes AS b 
       INNER JOIN usersbikes AS ub 
       ON b.id = ub.bike_id
       WHERE ub.username = "${user.username}"`, (err1, usersbikes) => {
        if (err1) throw err1

        // query all bikes if user want to add bikes
        con.query(`SELECT * FROM bikes`, (err2, allBikes) => {
          if (err2) throw err2

          con.query(`SELECT e.brand, e.location, e.distance, e.date, u.swimTime, u.T1, u.bikeTime, u.T2, u.runTime  FROM event AS e
          INNER JOIN usersevents AS u
          ON e.id = u.event_id
          WHERE u.username = "${user.username}"`, (err3, usersEvents) => {
            if (err3) throw err3

            con.query(`SELECT * FROM event`, (err4, allEvents) => {
              if (err4) throw err4

      // checking if url have a user
      if (user.length !== 0) {
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
    } else {
      res.render('index')
    }
  })
})
})
})
    })
  }

  function statsPage(req, res, con) {

    // most popular bikes limit to 10
    con.query(`SELECT b.brand, b.model, b.manfyear
    FROM bikes AS b
    INNER JOIN usersbikes as ub
    ON b.id = ub.bike_id
    GROUP BY b.model
    ORDER BY COUNT(*) DESC LIMIT 10`, (err, mostPopularBikes ) => {
      if(err) throw err

      // all users
      con.query(`SELECT username, first_name, last_name FROM user`, (err1, allUsers) => {
        if (err1) throw err1

        // Fastest runners limit to 10
      con.query(`SELECT u.username, r.pace 
      FROM user AS u
      INNER JOIN run AS r
      ON u.username = r.username
      WHERE r.pace <> 0
      GROUP BY u.username
      ORDER BY r.pace LIMIT 10`, (err2, fastestRunners) => {
        if (err2) throw err2

        con.query(`SELECT s.wetsuit, r.training_shoe, r.racing_shoe
        FROM user AS u
        INNER JOIN swim AS s
        ON u.username = s.username
        INNER JOIN run AS r
        ON r.username = u.username
        GROUP BY u.username
        ORDER BY COUNT(*)`, (err3, accessories) => {
          if (err3) throw err3

        con.query(`SELECT e.brand, e.distance, e.location, e.date
        FROM event AS e
        INNER JOIN usersevents As us
        ON us.event_id = e.id
        GROUP BY e.brand
        ORDER BY COUNT(*)`, (err4, mostPopularEvents) => {
          if (err4) throw err4

    res.render('stats', {
      mostPopularBikes: mostPopularBikes,
      allUsers: allUsers,
      fastestRunners: fastestRunners,
      mostPopularWetsuit: accessories[0].wetsuit,
      mostPopularTrainingShoe: accessories[0].training_shoe,
      mostPopularRacingShoe: accessories[0].racing_shoe,
      mostPopularEvents: mostPopularEvents
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
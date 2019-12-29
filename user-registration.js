const express = require("express");
const router = express.Router();
const pool=require('./db')

router.get("/", async (req, res) => {
  await pool
    .query("SELECT * FROM `user-registration`")
    .then(result => {
      if (result && result.length > 0) res.send(result[0]);
    })
    .catch(err => {
      console.log(err.message);
      res.send(400);

    });
});

router.post("/", (req, res) => {
    const data = req.body;
    pool
      .query("INSERT INTO `user-registration` SET ?", data)
      .then(result => {
        res.send("succesfull registration");
        console.log(result);
      })
      .catch(err => {
        console.error(err.message);
        res.send(400);
      });
  });
  
module.exports = router;

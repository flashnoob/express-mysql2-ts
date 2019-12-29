const express = require("express");
const router = express.Router();
const pool = require("./db");
const validation = require("./validation/validation");
router.get("/", async (req, res) => {
  await pool
    .query("SELECT * FROM authors")
    .then(result => {
      if (result && result.length > 0) res.send(result[0]);
    })
    .catch(err => {
      res.send(400);
      console.log(err.message);
    });
});

router.get("/:id", async (req, res) => {
  await pool
    .query("select * from authors where id=?", [req.params.id])
    .then(result => {
      if (result && result[0].length > 0) res.send(result[0]);
      else res.send("no result ");
    })
    .catch(err => {
      console.error(err.message);
      res.send(400);
    });
});

router.put("/:id", (req, res) => {
  const data = req.body;
  validateData(data)
    .then(result => {
      pool
        .query("UPDATE authors SET ? WHERE id = " + req.params.id, data)
        .then(result => {
          res.send("succesfull registration");
          console.log(result);
        });
    })
    .catch(err => {
      console.log(err.message);
      res.sendStatus(400);
    });
});

async function validateData(data) {
  return await validation.validateAsync({
    first_name: data.first_name,
    last_name: data.last_name,
    birthDate: data.birthdate,
    email: data.email
  });
}

router.post("/", (req, res) => {
  const data = req.body;
  pool
    .query("INSERT INTO authors SET ?", data)
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

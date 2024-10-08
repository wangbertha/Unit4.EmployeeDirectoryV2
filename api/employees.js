const express = require('express');
const router = express.Router();
module.exports = router;

const employees = require("../data/employees");

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    next({ status: 404, message: `There is no employee with id ${id}.`});
  }
});

router.post("/", (req, res) => {
    const { name } = req.body;
    if (name) {
        const id = employees.length+1;
        const employee = { id, name }
        employees.push(employee);
        res.status(201).json(employee);
    } else {
        next({ status: 400, message: 'New employee entry must have a name provided.'})
    }
})
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const error = require("./middleware/error");

const users = require("./routes/users/users");
const employees = require("./routes/employees/employees");
const tenants = require("./routes/tenants/tenants");
const apartments = require("./routes/apartments/apartments");
const floors = require("./routes/floors/floors");
const units = require("./routes/units/units");
const departments = require("./routes/departments/departments");
const visitors = require("./routes/visitors/visitors");
const guarantors = require("./routes/guarantors/guarantors");
const inboxes = require("./routes/inboxes/inboxes");
const income = require("./routes/income/income");
const expenses = require("./routes/expenses/expenses");
const app = express();

///database connection
require("./connection/connection")();

app.use(express.json());
app.use(cors());

app.use("/api/users", users);
app.use("/api/employees", employees);
app.use("/api/tenants", tenants);
app.use("/api/apartments", apartments);
app.use("/api/floors", floors);
app.use("/api/units", units);
app.use("/api/departments", departments);
app.use("/api/visitors", visitors);
app.use("/api/guarantors", guarantors);
app.use("/api/inboxes", inboxes);
app.use("/api/income", income);
app.use("/api/expenses", expenses);

app.use(error);

app.get("/", (req, res) => {
  res.send("Server set up successfull.");
});

app.listen("9000", () => {
  console.log("Server running at port {9000} ");
});

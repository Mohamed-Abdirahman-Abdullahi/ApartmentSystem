const express = require('express');
const cors = require('cors');

const users = require('./routes/users/users')
const employees = require('./routes/employees/employees');
const tenants = require('./routes/tenants/tenants')
const apartments = require('./routes/apartments/apartments');
const floors = require('./routes/floors/floors');
const units = require('./routes/units/units');
const departments = require('./routes/departments/departments');
const visitors = require('./routes/visitors/visitors');
const guarantors = require('./routes/guarantors/guarantors');
const inboxes = require('./routes/inboxes/inboxes');

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/users', users);
app.use('/api/employees', employees);
app.use('/api/tenants', tenants);
app.use('/api/apartments', apartments);
app.use('/api/floors', floors);
app.use('/api/units', units);
app.use('/api/departments', departments);
app.use('/api/visitors', visitors);
app.use('/api/guarantors', guarantors);
app.use('/api/inboxes', inboxes);

app.get('/', (req, res)=>{
    res.send("Server set up successfull.")
})

app.listen('9000', ()=>{
    console.log("Server running at port {9000} ")
})
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const  cors = require('cors');
const path = require('path');
app.use(express.static('./dist/frontend'));

// Middleware
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(cors());

// Import Routes
const employerRoute = require('./routes/employer')
const jobRoute = require('./routes/job')
const student = require("./routes/student")
const admin = require('./routes/admin');
const skill = require('./routes/skill')
const placement = require('./routes/placement');

app.use('/api/employer/',employerRoute)
app.use('/api/job/',jobRoute);
app.use("/api/student",student);
app.use('/api/admin',admin);
app.use('/api/skill',skill);
app.use('/api/placement',placement);

// for hosting
app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
    });
    
const port=process.env.PORT||3000;
// Connect to db
mongoose.connect(process.env.dbUrl, {   useNewUrlParser: true
                                        // useUnifiedTopology: true,
                                        // useCreateIndex: true       
                                     }, () =>
    console.log('Connected to DB!')
);
// Server
app.listen(port,() => {
    console.log('Server starts at :'+port);  
});
const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

const { sendMail } = require('./services/email.service');
const ticketRoutes = require('./routes/ticket.routes');
const Cron = require('./crons/cron');

const app = express();


env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Registering routes
ticketRoutes.routes(app);


app.listen(process.env.PORT, async () => {
    console.log('Notification server started on PORT ', process.env.PORT);
    // sendMail(process.env.EMAIL, process.env.EMAIL_PASS);

    DB_URL = undefined;

    if(process.env.NODE_ENV == 'development'){
        DB_URL = process.env.DB_URL
    }else{
        DB_URL = process.env.PROD_DB_URL
        
    }

    try {
        await mongoose.connect(DB_URL);
        console.log('Successfully connected to MONGO')
    } catch (error) {
        console.log(error);
    }

    Cron.mailerCron();

})
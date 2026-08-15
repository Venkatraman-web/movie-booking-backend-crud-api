// Movie Booking Backend Using REST API

const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

const MovieRoutes = require('./routes/movie.routes');
const TheatreRoutes = require('./routes/theatre.routes');
const AuthRoutes = require('./routes/auth.routes');
const UserRoutes = require('./routes/user.routes');
const BookingRoutes = require('./routes/booking.routes');
const ShowRoutes = require('./routes/show.routes');
const PaymentRoutes = require('./routes/payment.routes');

env.config();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.set('debug', true);

MovieRoutes.routes(app);
TheatreRoutes.routes(app);
AuthRoutes.routes(app);
UserRoutes.routes(app);
BookingRoutes.routes(app);
ShowRoutes.routes(app);
PaymentRoutes.routes(app);

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);

    DB_URL = undefined;

    if(process.env.NODE_ENV == 'development'){
        DB_URL = process.env.DB_URL
    }else{
        DB_URL = process.env.PROD_DB_URL
        
    }

    mongoose.connect(DB_URL)
    .then(() => {
        console.log("Connected");
    })
    .catch((err) => {
        console.log(err);
    });

    console.log('Successfully connected to mongo');
    
})
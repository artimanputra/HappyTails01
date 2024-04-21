require('dotenv').config()

const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const ejs = require("ejs");
const mongoose = require('mongoose')
const dbConn = require("./config/dbConn")

const Register = require("./models/Registers")


const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require("cookie-parser")
const setHeaders = require("./middleware/setHeaders")

const path = require('path')

const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const logEvents = require('./config/logEvents')

app.set('view engine', 'ejs');
const Razorpay = require('razorpay');

dbConn()
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(cors(corsOptions))
app.use(setHeaders)
app.use(cookieParser())

app.use(logger)

app.use(errorHandler)

// app.route("/")
//     .get((req,res,next)=>{
//         res.render("index")
//     })

app.get("/", (req, res) => {
    res.render("login");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.get("/register", (req, res) => {
    res.render("register");
})
app.get("/index", (req, res) => {
    res.render("index");
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/contact", (req, res) => {
    res.render("contact");
})
app.get("/location", (req, res) => {
    res.render("location");
})

app.get("/products", (req, res) => {
    res.render("products");
})


app.get("/breed/german", (req, res) => {
    res.render("breed/german");
})
app.get("/breed/labrador", (req, res) => {
    res.render("breed/labrador");
})
app.get("/breed/golden", (req, res) => {
    res.render("breed/golden");
})
app.get("/breed/bulldog", (req, res) => {
    res.render("breed/bulldog");
})
app.get("/breed/rottweiler", (req, res) => {
    res.render("breed/rottweiler");
})
app.get("/breed/beagle", (req, res) => {
    res.render("breed/beagle");
})
app.get("/breed/husky", (req, res) => {
    res.render("breed/husky");
})
app.get("/breed/pug", (req, res) => {
    res.render("breed/pug");
})
app.get("/breed/indianspitz", (req, res) => {
    res.render("breed/indianspitz");
})




app.get("/organisation/posh", (req, res) => {
    res.render("organisation/posh");
})
app.get("/organisation/apolo", (req, res) => {
    res.render("organisation/apolo");
})
app.get("/organisation/karma", (req, res) => {
    res.render("organisation/karma");
})
app.get("/organisation/jeevashram", (req, res) => {
    res.render("organisation/jeevashram");
})
app.get("/organisation/paws", (req, res) => {
    res.render("organisation/paws");
})
app.get("/organisation/redpaws", (req, res) => {
    res.render("organisation/redpaws");
})
app.get("/organisation/sayjaygandhi", (req, res) => {
    res.render("organisation/sayjaygandhi");
})
app.get("/organisation/friend", (req, res) => {
    res.render("organisation/friend");
})



app.post("/register", async (req, res) => {
    try {
        const registerUser = new Register({
            username: req.body.username,
            phone: req.body.number,
            email: req.body.email,
            password: req.body.password
        })

        const registered = await registerUser.save();

        res.status(201).render("login");


    } catch (error) {
        res.render('404page', {
            errorMsg: "Opps! Data entered not valid, go back to try again..."
        })
    }
})


app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const loginemail = await Register.findOne({ email: email });
        const loginpass = await bcrypt.compare(password, loginemail.password);

        if (loginpass) {
            res.status(201).render("index");
        }
        else {
            res.send("Invalid details Entered");
        }

    } catch (err) {
        res.render('404page', {
            errorMsg: "Opps! Login Credentials mismatched, go back to try again..."
        })
    }
})

app.post("/contact", function (req, res) {
    const object = req.body;
    console.log(object);

    // const data = {
    //     members: [
    //         {
    //             email_address: email,
    //             status: "subscribed",
    //             merge_fields: {
    //                 FNAME: fName,
    //                 LNAME: lName

    //             }
    //         }
    //     ]
    // };

    // const jsondata = JSON.stringify(data);

    // const url = "https://us20.api.mailchimp.com/3.0/lists/f18a66ba33";

    // const options = {
    //     method: "POST",
    //     auth: "Sarthak:b33da6a5604d7d7d9a4b2fd861df7ba0-us20"
    // }
    // const request = https.request(url, options, function (response) {
    //     response.on("data", function (data) {
    //         console.log(JSON.parse(data));


    //         if (response.statusCode === 200) {
    //             res.sendFile(__dirname + "/success.html");
    //         }

    //         else {
    //             res.sendFile(__dirname + "/failure.html");
    //         }
    //     });
    // });

    // request.write(jsondata);
    // request.end();
});

app.get("*", (req, res) => {
    res.render('404page', {
        errorMsg: "Opps! page not found, Click Here to go back"
    })
})





//razorpay

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_TGr6TblEdcfhCA',
    key_secret: 'Pa51LspiROAfGiIb8J1oUohX',
});

app.post('/create/orderId', (req, res) => {
    console.log('Create orderId request', req.body);
    const options = {
        amount: req.body.amount,
        currency: 'INR',
        receipt: 'rcp1',
    };
    razorpayInstance.orders.create(options, (err, order) => {
        console.log(order);
        res.send({ orderId: order.id });
    });
});

app.post('/api/payment/verify', (req, res) => {
    const body = req.body.response.razorpay_order_id + '|' + req.body.response.razorpay_payment_id;
    const crypto = require('crypto');
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(body.toString())
        .digest('hex');
    console.log('Signature received:', req.body.response.razorpay_signature);
    console.log('Signature generated:', expectedSignature);

    const response = { signatureIsValid: 'false' };
    if (expectedSignature === req.body.response.razorpay_signature) {
        response.signatureIsValid = 'true';
    }
    res.send(response);
});





mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
        console.log(`Server is Up on PORT ${PORT}`)
    })
})

mongoose.connection.on('error', (err) => {
    logEvents(err, "err.log")
})
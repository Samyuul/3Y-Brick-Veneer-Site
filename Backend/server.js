const express = require("express"); // Import express
const app = express();
const cors = require("cors");       // Import cors

// Specify browser 
var corsOptions = {
    origin: "https://www.3ybrickveneer.ca"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application / json
app.use(express.json());

// Parse requests of content-type - application / x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Import table model
const db = require("./app/model");

// Create table   
db.sequelize_model.sync()
.then(() => { 
    console.log("Successfully synced db.");
})
.catch((err) => { 
    console.log("Failed to sync db: " + err.message);
});

// Simple Route for testing
app.get("/", (req, res) => {
    res.json({ message: "Successful" });
});

// Import routes for manipulating orders
require("./app/routes/total.routes.js")(app);

// Set port and listen for requests on specified port
const PORT = process.env.PORT || 8080;

app.listen(PORT, err => {
    if (err) {
        console.log("Error occured while setting up server")
    } else {
        console.log(`Server is running on port ${PORT}.`);
    }
});
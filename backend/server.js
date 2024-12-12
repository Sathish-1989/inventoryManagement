const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dB =require('./database');
const routes = require('./routes/routes');
const passport = require('passport');
const path = require('path');
const {generateSalt, hashPassword} =require('./passport/hashUtils');
const port = 9000;


const app = express();

app.use(cors());
app.use(express.json());

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
}));

app.use(express.urlencoded({extended: true}));

// Serve the invoices folder statically
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));


// Endpoint to force download
app.get('/invoices/:invoiceId', (req, res) => {
  const { invoiceId } = req.params;
  const filePath = path.join(__dirname, 'invoices', `${invoiceId}.pdf`);
  
  res.download(filePath, `${invoiceId}.pdf`, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("File not found");
    }
  });
});


app.use('/',routes);


app.listen(port,()=>{
    console.log("Server is listening to the port"+ port)
})
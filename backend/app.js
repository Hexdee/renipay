require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { randomUUID } = require('crypto');
const path = require("path");
const auth = require("./middleware/auth");
const cors = require("cors");
const ethers = require('ethers');
const reniAbi = require("./reniabi.json").abi;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// importing user context
const User = require("./model/user");
const Transaction = require("./model/transaction");

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to renipay");
})

app.get("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (user) {
    res.status(200);
    res.render('payment', { merchant: username });
  } else {
    res.status(404);
    res.send("User not found!");
  }
});

// return a user details
app.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
    let { first_name, last_name, email, balance } = user;
    if (!balance) {
      balance = 0;
    }
    res.status(200);
    res.send({ first_name, last_name, email, username, balance: balance.toFixed(2) });
  } catch (err) {
    res.status(404);
    res.send("user not found");
  }
});

app.post("/auth", auth, async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });
    const { first_name, last_name, username, balance, transactions } = user;
    res.status(200);
    res.send({ first_name, last_name, email, username, email, balance: balance.toFixed(2), transactions });
  } catch (err) {
    res.status(400);
    res.send("Bad request");
  }
})


// Register
app.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, username, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login!");
    }

    // Check if username is taken
    const oldUsername = await User.findOne({ username });

    if (oldUsername) {
      return res.status(409).send("Username Already Taken!");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      balance: 0,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      username: username.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json({ first_name, last_name, balance: 0, email, username, token });
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});


// Login
app.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "3d",
        }
      );

      // save user token
      user.token = token;
      const { first_name, last_name, balance, transactions } = user;
      // user
      res.status(200).json({ first_name, last_name, email, balance: balance.toFixed(2), token, transactions });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// Listen to smart contract for payment and update user balance
const reniAddress = "0xa5AbfB0ABcaBfeE47996BCC0DE4022dC4f09D087";
const provider = new ethers.providers.JsonRpcProvider(`https://rpc-mumbai.maticvigil.com/v1/${process.env.MATIC_VIGIL_API_KEY}`);

const contract = new ethers.Contract(reniAddress, reniAbi, provider);
contract.on("paymentSuccessful", async (amount, payer, payer_address, merchant, description) => {
  try {
    const value = Number(amount) / 10 ** 6;
    console.log({ merchant })

    const user = await User.findOne({ username: merchant });
    let balance = user.balance || 0;
    balance = Number(balance) + Number(value);
    const newTransaction = await Transaction.create({
      type: "payment",
      payer,
      payer_address,
      amount: Number(value),
      merchant,
      description,
      status: "confirm",
    })
    const transactions = user.transactions;
    transactions.unshift(newTransaction);
    await User.updateOne({ username: merchant }, { balance, transactions });
  } catch (err) {
    console.log(err)
  }
});



module.exports = app;

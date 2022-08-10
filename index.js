const express = require('express');
const session = require('express-session')

//create session store to save session in memory
const store = new session().MemoryStore()
const app = express();

//session middleware
const secret = "very secret key"
app.use(session({
  secret: secret,
  cookie: { maxAge: 30000 },
  saveOnInitialize: false,
  store
}))

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.post('/login', (req, res) => {
  const { userName, password } = req.body
  if (req.session.authenticated) {
    //user already auth
    res.status(200).json(req.session)
  } else {
    //validate password
    if (password === 2121234) {
      req.session.authenticated = true
      req.session.user = {
        userName, password
      }
      res.json(req.session)
    } else {
      res.status(401).json("bad credtials")
    }
  }
});

app.listen(3000, () => {
  console.log('server started');
});

const express = require('express');
const app=express();
const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const port = process.env.PORT || 9800

app.set('view engine','ejs');
app.set('views','./views/pages');

app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req, res)=>{
    return res.render('login')
});

passport.serializeUser((user, cb)=>{
    return cb(null,user)
})

app.get('/profile',(req,res)=>{
  return res.send(user)
})
app.get('/error',(req,res)=>{
    return res.send("error while login!Please Login")
});
//Google Strategy
passport.use(new GoogleStrategy({
    clientID : "733970707996-qboproskg05pofkvuqpj5ng7aort6i96.apps.googleusercontent.com",
    clientSecret: "nOUuVJVj7P9FZKlpRpMthRM9",
    callbackURL: "http://localhost:9800/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    user=profile
    return cb(null,user)
  }
));


app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})
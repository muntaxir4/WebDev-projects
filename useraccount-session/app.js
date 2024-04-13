import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

const app=express();
const port=3000;

dotenv.config(); 
const dbConfig={
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
};
const pgPool= new pg.Pool(dbConfig)

app.use(session({
    store: new (connectPgSimple(session))({
        pool: pgPool,
        createTableIfMissing: true
    }),
    secret : process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000* 60* 30}
}));
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(passport.authenticate('session'));

const logindb= new pg.Client(dbConfig);
logindb.connect();

app.all('*',(req,res,next)=>{
    console.log(req.session);
    console.log(req.originalUrl);
    next();
})

app.get('/',(req,res)=>{
    res.render('index.ejs',{user: req.session.passport});
});
app.get('/login',(req,res)=>{
    if(req.isAuthenticated())
    return res.redirect('/')
    res.render('login.ejs');
});
app.get('/register',(req,res)=>{
    if(req.isAuthenticated())
    return res.redirect('/')
    res.render('register.ejs');
});

app.get('/secrets',(req,res)=>{
    if (req.isAuthenticated()) {
        res.render("secrets.ejs", { username: req.session.passport.user});
      } else {
        res.redirect("/login");
      }
});
app.post('/register',async (req,res,next)=>{
    const username=req.body.username, pass=req.body.password;
    try {
        const password=await bcrypt.hash(pass, 10);
        try {
            const result= await logindb.query('insert into login values ($1,$2) RETURNING *',[username,password]);
            const user= result.rows[0];
            console.log('registered',user);
            req.login(user,(err)=>{
                if(err) return next(err);
                console.log('success');
                res.redirect('/secrets');
            })
        } catch (error) {
            console.error(error);
            return res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        return res.redirect('/');
    }
});
app.post('/login',passport.authenticate('local',{
    successRedirect: '/secrets',
    failureRedirect: '/login'
}))

app.get('/logout', function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
  });

passport.use(new Strategy(async function verify(username, password, cb){
    try{
        const userData= await logindb.query('select * from login where username = $1',[username]);
        if(!userData.rows.length) return cb(null, false, { message: 'Incorrect username or password.' });
        let matched= await bcrypt.compare(password, userData.rows[0].password);
        if(!matched) return cb(null, false, { message: 'Incorrect username or password.' });
        return cb(null, userData.rows[0]);
    }
    catch (err){
        return cb(err);
    }
    
}))

passport.serializeUser((user,done)=>{
    return done(null, user.username);
})
passport.deserializeUser(async (username,done)=>{
    const result= await logindb.query('select * from login where username = $1',[username]);
    return done(null,result.rows[0]);
})




app.listen(port,async (err)=>{
    if(err) return console.error(err);
    console.log(`Server running at:\nhttps://localhost:${port}`);
    const net= (await import("os")).networkInterfaces();
    for(let key in net){
        console.log(`https://${net[key][0].address}:${port}`);
    }
});
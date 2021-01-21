const express = require('express');
const morgan = require('morgan');
const moongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');
const router = require('./routes/blogRoutes');

// express app
const app = express();

// connect to database
const dbURI = 'mongodb+srv://jeethendra:0lebaVUwNsovyL76@boisx4-blog.4g8up.mongodb.net/BOISX4?retryWrites=true&w=majority'
moongoose.connect(dbURI, { useNewUrlParser: true ,  useUnifiedTopology: true })
  .then((res) => console.log("Connected to the Database"))
  .catch((err) => console.log(err))

// register view engine
app.set("view engine", "ejs");

// listen for requests
app.listen(3000);

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'));

app.use('/blogs', blogRoutes)

// response
app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  //res.send("<h1>About page</h1>");
  res.render('about', {title : "About"});
});

// redirect
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// })

// 404 should be at last
app.use((req, res) => {
  res.status(404).render('404', {title : "404"});
})
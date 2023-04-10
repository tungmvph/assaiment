
const express = require('express')
const app = express();
const port = 3000
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const spControler=require('./controllers/spController')
const userCotroler=require('./controllers/userControler')
const logincontrol=require('./controllers/login.controler')
const uri = 'mongodb+srv://tungmvph22660:8oz8QWq9Cy1Kbwza@cluster0.7evtk6n.mongodb.net/sanpham?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.engine('hbs', expressHbs.engine());
app.engine('.hbs', expressHbs.engine({extname: "hbs"}));
app.set('view engine', '.hbs');
app.use(express.json());

mongoose.connect(uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );


app.use('/sp',spControler);
app.use('/us',userCotroler)
app.use('/',logincontrol)

// app.get('/', (req, res) => {
//   res.render('dn');
// });

app.listen(port,()=>{console.log('sever running')})
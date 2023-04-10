const express = require('express')
const UsModale=require('../modals/usera')
const app = express();

app.get('/',(req,res) =>{
    res.render('user/addorreditUser.hbs',
    {
        viewTile:"add acount"
    })

})




app.post('/add',async(req,res)=>{
    console.log(req.body);
    if(req.body.id==''){
        // them
        addrecod(req,res);
       
    }else{
        //update
        updaterecod(req,res);
    }
   
})

//
async function addrecod(req,res){
  const existingUser = await UsModale.findOne({ username: req.body.username });
  if (existingUser) {
      return res.status(400).send('Tên đăng nhập đã tồn tại');
  }

  const newUser = new UsModale(req.body);
  try {
      await newUser.save();
      res.redirect('/us/list');
  } catch (error) {
      res.status(500).send(error);
  }
}

async function updaterecod(req, res) {
  
      const options = { new: true, runValidators: true };

      const updatea = await UsModale.findByIdAndUpdate(req.body.id,req.body, options);
      if (!updatea) {
        return res.status(404).send('Không tìm thấy sản phẩm để cập nhật');
      }
      
      try {
        await updatea.save();
        res.redirect('/us/list');
      } catch (err) {
        console.error(err);
        res.render('user/addorreditUser.hbs', {
          viewTile: 'Lỗi cập nhật sản phẩm',
          us: req.body
        });
      }
      
  }
//list

app.get('/list',(req,res) =>{
    UsModale.find({}).then(us=>{
        res.render('user/view-user.hbs',
        {
            us:us.map(us =>us.toJSON())
        })
    })
   

})
app.get('/editus/:id', (req, res) => {
    const usid = req.params.id;
    UsModale.findById(usid)
      .then(us => {
        if (us) {
          res.render('user/addorreditUser.hbs', {
            us: us.toJSON(),
            viewTile:"update"
          });
        } else {
          res.status(404).send('Sản phẩm không tồn tại');
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Lỗi server');
      });
  });
  
  
   

app.get('/deletesp/:id',async (req,res)=>{
  try {
    const us=await UsModale.findByIdAndDelete(req.params.id,req.body);
    if (!us) res.status(404).send("k có dl");
    else{
        res.redirect('/us/list');
    }

  } catch (error) {
    res.status(500).send(error);
  }
  
})


module.exports=app;
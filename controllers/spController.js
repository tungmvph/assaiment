const express = require('express')
const Spmodale=require('../modals/sp')
const app = express();

app.get('/',(req,res) =>{
    res.render('sp/addoreditsp.hbs',
    {
        viewTile:"add SAN PHAM"
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
function addrecod(req,res){
    const pr=new Spmodale(req.body);
    // try {
        pr.save();
        // res.send(pr);
        res.redirect('/sp/list');
       
    // } catch (error) {
    //     res.status(500).send(error)
    // }
}

async function updaterecod(req, res) {
  
      const options = { new: true, runValidators: true };

      const updatea = await Spmodale.findByIdAndUpdate(req.body.id,req.body, options);
      if (!updatea) {
        return res.status(404).send('Không tìm thấy sản phẩm để cập nhật');
      }
      
      try {
        await updatea.save();
        res.redirect('/sp/list');
      } catch (err) {
        console.error(err);
        res.render('sp/addoreditsp.hbs', {
          viewTile: 'Lỗi cập nhật sản phẩm',
          sp: req.body
        });
      }
      
  }
//list

app.get('/list',(req,res) =>{
    Spmodale.find({}).then(sp=>{
        res.render('sp/view-sp.hbs',
        {
            sp:sp.map(sp =>sp.toJSON())
        })
    })
   

})
app.get('/editsp/:id', (req, res) => {
    const spId = req.params.id;
    Spmodale.findById(spId)
      .then(sp => {
        if (sp) {
          res.render('sp/addoreditsp.hbs', {
            sp: sp.toJSON(),
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
    const sp=await Spmodale.findByIdAndDelete(req.params.id,req.body);
    if (!sp) res.status(404).send("k có dl");
    else{
        res.redirect('/sp/list');
    }

  } catch (error) {
    res.status(500).send(error);
  }
  
})


module.exports=app;
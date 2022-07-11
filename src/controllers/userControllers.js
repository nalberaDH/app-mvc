const fs = require('fs');

const path = require('path');
const { all } = require('../routes/users');

const jsonPath = path.join(__dirname,'../database/users.json');

const json = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

const allUsers = json.map(e => {
    return {
      id: e.id,
      name: e.name,
      email: e.email,
      img: e.img,
    }
  }) 

const controller = {
    allUsers: (req,res) => {

        //res.send(users);
        res.render(path.join(__dirname,'../views/users'),{'allUsers':allUsers})
    },

    getUserId: (req,res) => {
        const id = req.params.id;
        const user = allUsers.find((element) => element.id == parseInt(id));
        if(user){
            //res.send(user);
            res.render(path.join(__dirname,'../views/userdetail'),{'user':user})
        }else{
            res.send("Not found");
        }
    },

    search: (req, res) => {
        const name = req.query.name;
        const user = allUsers.filter((element) => element.name.toUpperCase().includes(name.toUpperCase()));
        if(user){
            res.render(path.join(__dirname,'../views/userdetail'),{'user':user})
        }else{
            res.send("Not Found");
        }
    },

    postUser: (req,res) =>{
        const newName = req.body.name;
        const newEmail = req.body.email;

        const id = allUsers[allUsers.length - 1].id;
        const newId = id + 1;

        const obj = {
            id: newId,
            name: newName,
            email: newEmail,
        }
        allUsers.push(obj);
        
        fs.writeFile(jsonPath,JSON.stringify(allUsers),(error) => {
            if(error){
                res.send(error);
            }else{
                res.redirect('/users');
            }
        })
        //res.send(allUsers);
    },

    edit: (req,res)=>{
        const id = req.params.id;
        const userEdit=allUsers.find((element) => element.id === parseInt(id));
        res.render(path.join(__dirname,'../views/useredit'),{'userEdit':userEdit});
    },
    
    editConfirm: (req,res) => {
        const newId = req.body.id;
        const newName = req.body.name;
        const newEmail = req.body.email;

        allUsers.forEach((element) => {
            if(element.id === parseInt(newId)){
                element.id = parseInt(newId);
                element.name = newName;
                element.email = newEmail;
            }
        });

        

        fs.writeFile(jsonPath,JSON.stringify(allUsers),(error) => {
            if(error){
                res.send(error);
            }else{
                res.redirect('/users');
            }
        })       
    }
};


module.exports= controller;
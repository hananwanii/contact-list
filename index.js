const express = require('express');
const { appendFile } = require('fs');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const app = express();
const Contact = require('./models/contact');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.use(express.static('assests'));

// // middleware1
// app.use(function(req, res, next){
//     console.log('middleware 1 called');
//     next();
// });


// // middleware2
// app.use(function(req, res, next){
//     console.log('middleware 2 called');
//     next();
// });

var contactList = [
    {
        name : "Hanan",
        phone : "9682599233"
    },
    {
        name:"Soleha",
        phone : "7780866849"
    },
    {
        name : "Mouj",
        phone : "9988776655"
    }
]

app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if (err){
            console.log('Error in fetching Contact from db');
            return;
        }
        return res.render('home', {
            title:"My Contacts List",
            contact_list : contacts
        });
    });

});

app.get('/practice', function(req, res){
    return res.render('practice',{
        title: "Lets Play with EJS"
    });
});

app.post('/create-contact', function(req, res){
    // contactList.push({
        // name: req.body.name,
        // phone: req.body.phone
    // });

    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact'); 
            return;
        }
        console.log('*******', newContact);
        return res.redirect('back');
    });


    
});

app.get('/delete-contact/', function(req, res){
    // get the id from query in url
    let id = req.query.id;

    //find the contact in database by using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if (err){
            console.log('error in deleting an object from database');
        }
        return res.redirect('back');

    });

    

   

});




app.listen(port, function(err){

    if (err){
        console.log('Error in running the server', err);
        return;
    
    }
    console.log("Yup! My Express Server is up and running on port: ", port);

});
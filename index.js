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

app.get('/', async function(req, res) {
    try {
        const contacts = await Contact.find({}).exec();
        res.render('home', {
            title: "My Contacts List",
            contact_list: contacts
        });
    } catch (err) {
        console.log('Error in fetching Contact from db:', err);
        // Handle the error accordingly
    }
});


app.get('/practice', function(req, res){
    return res.render('practice',{
        title: "Lets Play with EJS"
    });
});

app.post('/create-contact', async function(req, res) {
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
        console.log('*******', newContact);
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating a contact:', err);
        // Handle the error accordingly
    }
});


app.get('/delete-contact/', async function(req, res) {
    try {
        // Get the id from the query in the URL
        let id = req.query.id;

        // Find the contact in the database by using id and delete
        await Contact.findByIdAndDelete(id);

        return res.redirect('back');
    } catch (err) {
        console.log('Error in deleting an object from the database:', err);
        // Handle the error accordingly
    }
});





app.listen(port, function(err){

    if (err){
        console.log('Error in running the server', err);
        return;
    
    }
    console.log("Yup! My Express Server is up and running on port: ", port);

});
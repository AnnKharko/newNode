const express = require('express');
const expressHbs = require('express-handlebars');

const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname,'views')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine','.hbs');
app.engine('.hbs',expressHbs({
    defaultLayout: false
}))
app.set('views', path.join(__dirname,'views'));

// ============

app.get('/login', ((req, res) => {
    res.render('login');
}))

app.post('/login', (req, res) => {

    fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        const users = JSON.parse(data.toString())

        const filter = users.filter(user => user.email === req.body.email)
        if (filter.length) {
            let n = 0;
            for(let i = 0; i < users.length; i++){
                if (users[i].email === req.body.email) {
                    n = i;
                }
            }
            res.redirect(`/users/${n}`)
        } else {
            console.log('this user exist');
            res.redirect('/registration');
        }
    })
})
// ==============

app.get('/registration', ( (req, res) => {
    res.render('registration');
}));

app.post('/registration', (req, res) => {

    fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        const f = JSON.parse(data.toString())

        const filter = f.filter(user => user.email === req.body.email)
        if (filter.length) {
            res.redirect('/error')
        } else {
            console.log('fine')
            console.log(req.body);
            // f.push(req.body);
            // fs.appendFile(path.join(__dirname, 'users.json'), req.body ) //???
            res.redirect('/users')
        }
    })
})
//====================

app.get('/users', ((req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        const users = JSON.parse(data.toString())
        res.render('users', {users})
    })
}))



app.get('/users/:userId', ((req, res) => {
    const {userId} = req.params;
    fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        const f = JSON.parse(data.toString())
        res.send(f[userId - 1])

    })
}))
//======================
app.get('/error', ((req, res) => {
    res.render('error');
}))



app.listen(5000, () => {
    console.log('app listen 5000');
})

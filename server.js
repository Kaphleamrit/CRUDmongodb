const express =      require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

userSchema.methods.speak = function speak() {
    const greeting = this.name? "Hello, my name is " + this.name : "I don't have name";
    console.log(greeting);
}

const userModel = mongoose.model('user', userSchema);






main().then(function() {
    console.log("conneced to db successfully");


    // addUser("xyz", 23).catch(err => console.log(err));
getAll().then((users) => console.log(users + "\n\n\n")).catch(err => console.log(err));
getSelected(/^r/).then((res) => console.log(res)).catch(err => console.log(err));
updateUser({name: 'xyz'}).then(() => console.log("updated successfully")).catch(err => console.log(err));
deleteUser({name: 'xyz'}).then(() => console.log("deletion successful")).catch(err => console.log(err));
})
.catch(err => console.log(err));






async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

// add a user with name and age to the db
async function addUser(name, age) {
    const ram = new userModel({name: name, age: age});
        await ram.save();
}

// get all the users
async function getAll() {
    const users = await userModel.find();
    return users;
}

// find users having regex in their name
async function getSelected(regex) {
    const res = await userModel.find({name: regex});
    return res;
}

// update user matching regex object
async function updateUser(regex) {
 await  userModel.updateOne(regex, {name: 'updatedName', age: 14});
}

//delete user matching  regex object in the parameter
async function deleteUser(regex) {
    await userModel.deleteOne(regex);
}


const app = express();

app.get('/', function(req,res) {
    res.send("Hello");

});


app.listen( process.env.PORT, function() {
    console.log(`server started at port ${process.env.PORT}`);
})
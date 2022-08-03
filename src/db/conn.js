const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/mydatabase1")
        //await mongoose.connect("mongodb+srv://sumitgarudkar:test12345@cluster0.tjtaiuv.mongodb.net/ClingMSDatabase")
        console.log("Connectd To Data Base");
    }
    catch (err) {
        console.log(err, 'This is Error');
    }
}
connect();
module.exports = connect;
// const mongoose = require('mongoose');

// async function connectToMongoDB(url) {
//     try {
//         await mongoose.connect(url);
//         console.log('Connected okkkk');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }
// module.exports = connectToMongoDB;

const mongoose = require('mongoose');
let connectToMongoDB = async () => {
mongoose.connect(process.env.URL).then(()=>{
    console.log("✅ Connected to MongoDB");
}).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});
}
module.exports = connectToMongoDB;

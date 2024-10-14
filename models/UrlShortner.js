const mongoose = require('mongoose');

const ShortUrl = new mongoose.Schema({
    urlId: {
        type: String,
        required: true,
        unique: true
    },
    urlName: {
        type: String,
        // required: true,
    },
    urlType: {
        type: String,
        // required: true,
    },
    url: {
        type: String,
        required: true,
    },
    redirectUrl: {
        type: String,
    },
    urlFrequency: {
        type: Number,
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

// const getPromotionModel = (database) => {
//     if (database) {
//         const conn = mongoose.connection.useDb(database);
//         return conn.model('appointment', ShortUrl);
//     } else {
//         return mongoose.model('appointment', ShortUrl);
//     }
// }

// module.exports = getPromotionModel;

module.exports = mongoose.model('shorturl', ShortUrl);;

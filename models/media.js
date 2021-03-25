const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const mediaSchema = new Schema({
    shortName: String,
    description: String,
    img: String,
    imageFile: {type:String},
    imageName: {type:String},
    filePath: String,
    category: Array
});


const Media = model('Media', mediaSchema);

module.exports = Media;
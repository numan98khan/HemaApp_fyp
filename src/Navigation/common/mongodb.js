var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fyp', {useNewUrlParser: true, user: 'admin', pass: '123456'});

export default mongoose;
require('dotenv/config');
const app = require('./src/app/app');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose
    .connect('mongodb://127.0.0.1:27017/admattic-local', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}!`);
});


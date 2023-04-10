require('dotenv').config()
const app = require('./servidor')

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
});
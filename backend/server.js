require('dotenv').config();

const app = require('./src/app')
const connectDB = require('./src/db/db')

async function bootstrap() {
    try {
        await connectDB();

        app.listen(process.env.PORT, () => {
            console.log("Server started on PORT.")
        }) // starting the app in server.js
    } catch (error) {
        console.error("An error happened in bootstrap: ", error);
        process.exit(1);
    }
}

bootstrap();
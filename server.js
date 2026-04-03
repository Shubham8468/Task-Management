import app from "./app.js";
import { dbConnection } from "./config/dbConnection.js";
import { config } from "dotenv";

config({ path: "./config/config.env" });

dbConnection();

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listening at port ${process.env.PORT || 4000}`);
});

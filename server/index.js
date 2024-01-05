import app from "./app.js";
import connectDB from "./database/dbConnection.js";
import config from "./config/config.js";

let PORT = config.port;

const start = async () => {
  try {
    await connectDB(config.mongoose.url);
  } catch (error) {}
};
start();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

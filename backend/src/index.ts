import express from "express";
import router from "./routes/simulators.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/simulators", router)

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

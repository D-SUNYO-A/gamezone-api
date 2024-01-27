import http from "http";
import cluster from "cluster";
import os from 'os';
import { handleRoutes } from "./routes.js";
import { connectToDatabase } from "./utils/DbConnection.js";
import { corsMiddleware } from "./middleware/Cors.js";

const PORT = process.env.PORT || 3000;

// Utilisez le nombre de cœurs physiques disponibles
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary pid ${process.pid}`);
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    const app = http.createServer((req, res) => {

        corsMiddleware.handleCorsHeaders(req, res); 

        if (req.method === 'OPTIONS') {
            corsMiddleware.resWriteHead(req, res); 
        } else {
            handleRoutes(req, res);
        }
    });  
    
    connectToDatabase()
        .then(() => app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} and Connected to db`, process.pid);
        }))
        .catch(err => console.log(err))
}
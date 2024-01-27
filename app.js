import http from "http";
import cluster from "cluster";
import os from 'os';
import { connectToDatabase } from "./utils/DbConnection.js";
import { corsMiddleware } from "./middleware/Cors.js";
import { postController } from "./controllers/PostController.js";
import { gameController } from "./controllers/GameController.js";
import { responseUtil } from "./utils/ResponseUtil.js";

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
            if(req.url.startsWith('/uploads/')) {
                postController.getUploadsPost(req, res, import.meta.url);
            } else if(req.url === '/api/posts' && req.method === 'POST') {
                postController.createPost(req, res);
            } else if(req.url === '/api/posts' && req.method === 'GET') {
                postController.getPosts(req, res);  
            } else if(req.url.match(/\/api\/post\/([0-9]+)/) && req.method === 'GET') {
                const id = req.url.split('/')[3]; // api/post/1
                postController.getPost(req, res, id);
            } else if(req.url.match(/\/api\/post\/([0-9]+)/) && req.method === 'PUT') {
                const id = req.url.split('/')[3]; // api/post/1
                postController.updatePost(req, res, id);
            } else if(req.url.match(/\/api\/post\/([0-9]+)/) && req.method === 'DELETE') {
                const id = req.url.split('/')[3]; // api/post/1
                postController.deletePost(req, res, id);
            } else if(req.url === "/initialgames" && req.method === "GET") {
                gameController.handleInitialGames(req, res);
            } else if(req.url.startsWith("/games") && req.method === "GET") {
                gameController.handleGames(req, res);
            }  else {
                responseUtil.responseNotFound(res);
            }
        }
    });  
    
    connectToDatabase()
        .then(() => app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} and Connected to db`, process.pid);
        }))
        .catch(err => console.log(err))
}
// Server Routes

import { postController } from "./controllers/PostController.js";
import { gameController } from "./controllers/GameController.js";
import { responseUtil } from "./utils/ResponseUtil.js";

export const handleRoutes = (req, res) => {
  if (req.url.startsWith("/uploads/")) {
    postController.getUploadsPost(req, res, import.meta.url);
  } else if (req.url === "/api/posts" && req.method === "POST") {
    postController.createPost(req, res);
  } else if (req.url === "/api/posts" && req.method === "GET") {
    postController.getPosts(req, res);
  } else if (req.url.match(/\/api\/post\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3]; // api/post/1
    postController.getPost(req, res, id);
  } else if (req.url.match(/\/api\/post\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3]; // api/post/1
    postController.updatePost(req, res, id);
  } else if (req.url.match(/\/api\/post\/([0-9]+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[3]; // api/post/1
    postController.deletePost(req, res, id);
  } else if (req.url === "/initialgames" && req.method === "GET") {
    gameController.handleInitialGames(req, res);
  } else if (req.url.startsWith("/games") && req.method === "GET") {
    gameController.handleGames(req, res);
  } else {
    responseUtil.responseNotFound(res);
  }
};
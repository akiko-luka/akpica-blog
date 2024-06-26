import { Router } from "express";

import {
    createPost,
    postPhoto,
    getAllPosts,
    getPostById,
    updateOnePost,
    deleteOnePost,
    getPostsByTags,
    getPostBySlug,
    getPostsByAuthor
} from "../controllers/postController.js";

import { upload } from "../utils/multerStorage.js";

import { isAuth } from "../middlewares/isAuth.js";

const postRouter = Router();

// CRUD -----------

// CREATE
postRouter.post("/", isAuth, upload.single("image"), createPost);
// post photo
postRouter.get("/photo/:title", postPhoto)
// READ all
postRouter.get("/", getAllPosts);
// READ each
postRouter.get("/:id", getPostById);
// Read by tags
postRouter.get("/tags/:tags", getPostsByTags);
// Read by author
postRouter.get("/author/:author", getPostsByAuthor);
// UPDATE
postRouter.patch("/:id", isAuth, upload.single("image"), updateOnePost);
// DELETE one
postRouter.delete("/:id", isAuth,  deleteOnePost);

postRouter.get("/slug/:slug", getPostBySlug);


export default postRouter;

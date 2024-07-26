import { Router } from "express";
import { auth } from "../controller/authController.mjs";
import {
  createAuthor,
  deleteOneAuthor,
  getAllAuthorIds,
  getAllAuthors,
  getAuthorById,
  updateOneAuthor,
} from "../controller/authorController.mjs";

const router = Router();

router.use(auth);

router.route("/").get(getAllAuthors).post(createAuthor);

router.get("/all", getAllAuthorIds);
router
  .route("/:authorId")
  .get(getAuthorById)
  .patch(updateOneAuthor)
  .delete(deleteOneAuthor);

export default router;

// router.get("/", getAllAuthors);
// router.get("/all", getAllAuthorIds);
// router.get("/:authorId", getAuthorById);
// router.post("/", createAuthor);
// router.put("/:authorId", updateOneAuthor);
// router.delete("/:authorId", deleteOneAuthor);

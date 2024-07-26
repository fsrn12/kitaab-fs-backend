import { Router } from "express";
import { auth } from "../controller/authController.mjs";
import {
  createBook,
  deleteOneBook,
  getAllBookIds,
  getAllBooks,
  getBookById,
  updateOneBook,
} from "../controller/bookController.mjs";

const router = Router();

router.use(auth);

router.route("/").get(getAllBooks).post(createBook);

router.get("/all", getAllBookIds);

router
  .route("/:bookId")
  .get(getBookById)
  .patch(updateOneBook)
  .delete(deleteOneBook);

export default router;

// router.get("/", auth, getAllBooks);
// router.get("/all", auth, getAllBookIds);
// router.get("/:bookId", auth, getBookById);
// router.post("/", auth, createBook);
// router.put("/:bookId", auth, updateOneBook);
// router.delete("/:bookId", auth, deleteOneBook);

import { deleteHandler, getHandler, postHandler, putHandler, getByIdHandler } from './handler';
import { Router } from 'express';

const router = Router();
router.route('/')
  .get(getHandler)
  .post(postHandler);

router.route('/:id')
  .get(getByIdHandler)
  .put(putHandler)
  .delete(deleteHandler);

export default router;

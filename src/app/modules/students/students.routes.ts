import express from 'express';
import { studentControllers } from './students.controller';
const router = express.Router();

router.get('/', studentControllers.getAllStudent);
router.get('/:id', studentControllers.getSingleStudent);


export const studentRoutes = router;

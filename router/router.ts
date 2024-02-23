import { createContactUser } from "../controller/contactController";
import { UserInput } from "../zodValidation/contactUser.schema";
import validateResource from '../zodValidation/validateResource';



const express = require('express');

const router = express.Router();

router.post('/ContactUser',validateResource(UserInput) , createContactUser);

module.exports = router;
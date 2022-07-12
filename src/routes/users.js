const express = require('express');
const userController = require('../controllers/userControllers');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/img'));
    },
    filename: (req, file, cb)=>{
        const newFile = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null,newFile);
    }
});

const upload = multer({ storage });


router.get('/users', userController.allUsers);
router.get('/user/:id', userController.getUserId);
router.get('/search',userController.search);

router.post('/user',upload.single('img'),userController.postUser);

router.get('/edit/:id', userController.edit);
router.put('/edit', userController.editConfirm);
router.delete('/delete/:id',userController.delete);

module.exports = router;


const express = require('express');
const {body} = require('express-validator');

const urlControllers = require('../controllers/url');

const router = express.Router();

router.get('/',urlControllers.getIndex);
router.post('/url',[
        body('url')
            .matches(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)
            .withMessage('Invalid Url')
    ],urlControllers.postUrl);
router.post('/short',urlControllers.postShort);

module.exports = router;
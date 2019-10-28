const router = require('express').Router();
const controllers = require('../controllers')
const auth = require('../utils/auth');

router.get('/add', auth(), controllers.expense.get.add);
router.post('/add',auth(), controllers.expense.post.add);
router.get('/home', auth(), controllers.expense.get.all);
router.get('/report/:id', auth(), controllers.expense.get.report);
router.get('/delete/:id', auth(), controllers.expense.get.delete);

module.exports = router;
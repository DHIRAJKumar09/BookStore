const express = require('express');
const {GetAllBooks,AddBook,GetBookDetail,DeleteBook,SearchBook} = require('../Controller/BookController');
const router = express.Router();

router.post('/',AddBook);
router.get('/',GetAllBooks);
router.get('/:id',GetBookDetail);
router.delete('/:id',DeleteBook);
router.get('/search/:key',SearchBook);

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
    res.send({ msg: 'Test route.' });
});




module.exports = router;
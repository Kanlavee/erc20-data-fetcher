const express = require('express');
const { getTokenData } = require('../controllers/apiController');

const router = express.Router();

/**
 * @route  GET /api/sanApiTest
 * @desc   Fetch ERC20 token data (name, symbol, decimals, totalSupply, balanceOf)
 * @access public
 */
router.get('/', getTokenData);

module.exports = router;

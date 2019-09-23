/**
 * Created by rabia on 3/4/2016.
 */

var express = require('express');
var router = express.Router();

var statsController = require("../controllers/statsController");

router.get("/LendersYield", statsController.LendersYield);
router.get("/LendersYieldForDifferentTerms", statsController.LendersYieldForDifferentTerms);
router.get("/YieldVsDebt_to_Income", statsController.YieldVsDebt_to_Income);
router.get("/YieldVsRating", statsController.YieldVsRating);
router.get("/getPortfolio", statsController.getPortfolio);
router.get("/getPortfolioWithInput", statsController.getPortfolioWithInput);


module.exports = router;
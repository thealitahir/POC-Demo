/**
 * Created by rabia on 3/3/2016.
 */

var express = require('express');
var router = express.Router();

var graphsController = require("../controllers/graphsController");

router.get("/IncomeRange", graphsController.IncomeRange);
router.get("/IncomeVerifiable", graphsController.IncomeVerifiable);
router.get("/DebtToIncomeRatio", graphsController.DebtToIncomeRatio);
router.get("/BorrowerRating", graphsController.BorrowerRating);
router.get("/ListingCategory", graphsController.ListingCategory);
router.get("/BorrowerRate", graphsController.BorrowerRate);
router.get("/LengthOfLoan", graphsController.LengthOfLoan);
router.get("/BorrowersPerState", graphsController.BorrowersPerState);
router.get("/GetExplorationData", graphsController.GetExplorationData);
router.get("/GetBorrowerDetails", graphsController.GetBorrowerDetails);
router.get("/getUsMapData", graphsController.getUsMapData);


module.exports = router;

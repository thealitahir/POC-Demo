var express = require('express');
var router = express.Router();
var request=require('request');

var averageYield = require('../public/js/VisualizationFiles/exploration/averageYield.json');
var BorrowerRate = require('../public/js/VisualizationFiles/exploration/BorrowerRate.json');
var BorrowerRating = require('../public/js/VisualizationFiles/exploration/BorrowerRating.json');
var BorrowersPerState = require('../public/js/VisualizationFiles/exploration/BorrowersPerState.json');
var DebtToIncomeRatio = require('../public/js/VisualizationFiles/exploration/DebtToIncomeRatio.json');
var GetBorrowerDetails = require('../public/js/VisualizationFiles/exploration/GetBorrowerDetails.json');
var GetExplorationData = require('../public/js/VisualizationFiles/exploration/GetExplorationData.json');
var IncomeRange = require('../public/js/VisualizationFiles/exploration/IncomeRange.json');
var IncomeVerifiable = require('../public/js/VisualizationFiles/exploration/IncomeVerifiable.json');
var ListingCategory = require('../public/js/VisualizationFiles/exploration/ListingCategory.json');
var LengthOfLoan = require('../public/js/VisualizationFiles/exploration/LengthOfLoan.json');

var statsAverageYield = require('../public/js/VisualizationFiles/stats/averageYield.json');
var LendersYield = require('../public/js/VisualizationFiles/stats/LendersYield.json');
var LendersYieldForTerm12 = require('../public/js/VisualizationFiles/stats/LendersYieldForTerm12.json');
var LendersYieldForTerm36 = require('../public/js/VisualizationFiles/stats/LendersYieldForTerm36.json');
var LendersYieldForTerm60 = require('../public/js/VisualizationFiles/stats/LendersYieldForTerm60.json');
var YieldVsDebt_to_Income = require('../public/js/VisualizationFiles/stats/YieldVsDebt_to_Income.json');
var YieldVsRating = require('../public/js/VisualizationFiles/stats/YieldVsRating.json');


var terms = {
  data1 : LendersYieldForTerm60.data,
  data2 : LendersYieldForTerm36.data,
  data3 : LendersYieldForTerm12.data
};
var exploration = {
  averageYield : averageYield,
  BorrowerRate : BorrowerRate,
  BorrowersPerState : BorrowersPerState,
  BorrowerRating : BorrowerRating,
  DebtToIncomeRatio : DebtToIncomeRatio,
  GetBorrowerDetails: GetBorrowerDetails,
  GetExplorationData : GetExplorationData.data,
  IncomeRange : IncomeRange,
  IncomeVerifiable : IncomeVerifiable,
  ListingCategory : ListingCategory,
  LengthOfLoan : LengthOfLoan
};

var stats = {
  LendersYield : LendersYield,
  averageYield : statsAverageYield,
  terms : terms,
  YieldVsDebt_to_Income : YieldVsDebt_to_Income,
  YieldVsRating : YieldVsRating
};

var testConfig = require('../testConfig');
Utility = require("../lib/utility");

//var usStates=require("../public/usStates.json")
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express', exploration : exploration , stats : stats});
});

router.get('/YieldPredictor', function(req, res) {

  var url = Utility.getBaseUrl()+'/services/api/analyticsstats/modelmetrics?processId='+CONFIGURATIONS.processId+'&stageId='+CONFIGURATIONS.yieldPredictorId;
  console.log(url);

  new request(url, function (error, response, body) {
    Utility.parseJSON(body, function (err, data) {
      if (!err){
        if(data.status)
          res.json({status: true, msg: data.message, data: data.response});
        else
          res.json({status: false, msg: 'Exception occurred in getting server response', data: data.response});
      }
      else
        res.json({status: false, msg: 'Error in parsing response', data: null});
    });
  });

});

router.get('/RatingPredictor', function(req, res) {

  var url = Utility.getBaseUrl()+'/services/api/analyticsstats/modelmetrics?processId='+CONFIGURATIONS.processId+'&stageId='+CONFIGURATIONS.ratingPredictorId;
  console.log(url);

  new request(url, function (error, response, body) {
    Utility.parseJSON(body, function (err, data) {
      if (!err){
        if(data.status)
          res.json({status: true, msg: data.message, data: data.response});
        else
          res.json({status: false, msg: 'Exception occurred in getting server response', data: data.response});
      }
      else
        res.json({status: false, msg: 'Error in parsing response', data: null});
    });
  });

});

router.get('/averageYield',function(req, res,next){
  var url=Utility.getBaseUrl()+"/services/api/querysink/getData?process=56d965214532041931e3902f%3A56d96522220c73cec685b5da%3B&query=select%20BorrowerState%20as%20State%2C%20Avg(EstimatedEffectiveYield)%20as%20Average_EstimatedEffectiveYield%20from%20TABLE56D96522220C73CEC685B5DA%20group%20by%20BorrowerState&tool=undefined&sink_type=smart&start=0&rows=5000&test_user=54f81d07f7da9fde14330cb9"
  console.log(url);
  request(url, function (error, response, body) {
    var parsedBody = "";
    try {

      parsedBody = JSON.parse(body);
    }
    catch (ex) {

      console.log("Exception occurred while parsing platform service response : " + ex);
    }
    finally {

      if (parsedBody instanceof Object) {
        res.send({status: true, msg: "response received", data: parsedBody});

      }
      else {
        res.send({status: false, msg: "Non JSON response received.", data: []});
      }
    }

  });
});

module.exports = router;

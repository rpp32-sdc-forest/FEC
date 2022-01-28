const productRouter = require('express').Router();
const productApi = require ('../ProductApi.js');
const ratingApi = require('../RatingApi.js');

const averageRate = function(ratings, recommended) {
  let a = Object.keys(ratings);
  let b = Object.values(ratings);

  let totalRatePoint = 0;

  if (a.length === b.length) {
    for (let i = 0; i < a.length; i ++) {
      totalRatePoint += a[i] * b[i];
    }
  }
  let totalRatings = 0;
  if (Object.values(ratings).length) {
    totalRatings = Object.values(ratings).reduce((a, b) => Number(a) + Number(b));
  }
  const fiveStar = Math.round((b[4] / totalRatings) * 100);
  const fourStar = Math.round((b[3] / totalRatings) * 100);
  const threeStar = Math.round((b[2] / totalRatings) * 100);
  const twoStar = Math.round((b[1] / totalRatings) * 100);
  const oneStar = Math.round((b[0] / totalRatings) * 100);
  let averageValues = totalRatePoint / totalRatings;
  if (Number(totalRatings) === 0 && Number(totalRatePoint) === 0) {
    averageValues = 0;
  }
  let numOfFalse = Number(recommended.false) || 0;
  let numOfTrue = Number(recommended.true) || 0;
  let percentageOfRecommended = ((numOfTrue) ? Math.round((numOfTrue / (numOfTrue + numOfFalse)) * 100) : 0);
  return [averageValues === 0 ? averageValues : averageValues.toFixed(1), percentageOfRecommended, oneStar, twoStar, threeStar, fourStar, fiveStar];
};
productRouter.get('/allProducts', async (req, res) => {
  let totalProducts = await productApi.getTotalProducts(1);
  let prevProducts = totalProducts.slice();
  var newProducts = [];
  let i = 2;
  while (prevProducts.length > 0) {
    let temp = await productApi.getTotalProducts(i);
    if (temp) {
      prevProducts = temp.slice();
      if (prevProducts.length > 0) {
        newProducts.push(prevProducts.slice());
        i++;
      }
    }
  }
  newProducts = newProducts.flat();
  let result = totalProducts.concat(newProducts);
  res.status(200).send(result);
});

productRouter.get('/productInfo', async (req, res) => {
  let id = req.query.id;

  var prodInfo = await productApi.getSpecificProduct(id);
  var prodStyleInfo = await productApi.getProductStyles(id);
  var prodRatingInfo = await ratingApi.ratingOverview(id);
  var prodRatingAverage = await averageRate(prodRatingInfo.ratings, prodRatingInfo.recommended);
  if (prodRatingAverage) {
    prodRatingInfo.ratings.average = prodRatingAverage[0];
    prodRatingInfo.recommended = prodRatingAverage[1];
    prodRatingInfo.ratings['1'] = prodRatingAverage[2];
    prodRatingInfo.ratings['2'] = prodRatingAverage[3];
    prodRatingInfo.ratings['3'] = prodRatingAverage[4];
    prodRatingInfo.ratings['4'] = prodRatingAverage[5];
    prodRatingInfo.ratings['5'] = prodRatingAverage[6];
  }
  var productData = {
    ...prodInfo,
    ...prodStyleInfo,
    ...prodRatingInfo
  };

  res.status(200).send(productData);

});

productRouter.get('/styleInfo', async (req, res) => {
  let id = req.query.id;
  var data = await productApi.getProductStyles(id);
  res.send(data);
});

productRouter.get('/reviewInfo', async (req, res) => {
  let id = req.query.id;
  var data = await productApi.getProductReviews(id);
  res.send(data);
});

module.exports = productRouter;
const {NODE_ENV} = process.env;


function onProd() {
  const onProdRegExp = /^prod/i;
  return onProdRegExp.test(NODE_ENV);
}

module.exports = {onProd};
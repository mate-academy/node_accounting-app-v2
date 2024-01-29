const moment = require('moment-timezone');

function checkIsReqBodyValid(params, listOfExpectedParams) {
  if (Object.keys(params).length === 0) {
    return false;
  }

  const isAllParamsSent = listOfExpectedParams.every(({ key }) => params.hasOwnProperty(key));

  const isAllParamsValid = listOfExpectedParams.every(({ key, type}) => {
    const paramValue = params[key];

    if (paramValue === undefined || paramValue === null) {
      return false;
    }

    switch(type) {
      case 'string':
        return typeof paramValue === 'string';

      case 'number':
        return typeof paramValue === 'number';

      case 'string($date-time)':
        return typeof paramValue === 'string' && moment(paramValue, moment.ISO_8601, true).isValid();

      case 'Array string':
        return Array.isArray(paramValue) && paramValue.every(item => typeof item === 'string');

      case 'Array number':
        return Array.isArray(paramValue) && paramValue.every(item => typeof item === 'number');
    }
  });

  return isAllParamsSent && isAllParamsValid;
}

module.exports = { checkIsReqBodyValid };

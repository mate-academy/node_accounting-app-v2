'use strict';

const PropertyTypes = {
  userId: 'number',
  title: 'string',
  category: 'string',
  note: 'string',
  amount: 'number',
  spentAt: 'Date',
};

const requiredProperties = [
  'userId',
  'title',
  'category',
  'amount',
  'spentAt',
];

const validateDataTypes = data => {
  for (const [key, value] of Object.entries(data)) {
    switch (PropertyTypes[key]) {
      case 'string':
        if (typeof value !== 'string') {
          throw Error();
        }
        break;

      case 'number':
        if (typeof value !== 'number') {
          throw Error();
        }
        break;

      case 'Date':
        if (!Date.parse(data.spentAt)) {
          throw Error();
        }
        break;

      default:
      //
    }
  }
};

const validateQuery = (query) => {
  Object.entries(query).forEach(([key, value]) => {
    switch (key) {
      case 'from':
      case 'to':
        if (!Date.parse(value)) {
          throw Error();
        }

        break;

      case 'userId':
        if (isNaN(+value)) {
          throw Error();
        }

        break;

      default:
        //
    }
  });
};

const validateEntity = data => {
  const hasRequiredProperties = requiredProperties.every(property => (
    data.hasOwnProperty(property)
  ));

  if (!hasRequiredProperties) {
    throw Error();
  }

  validateDataTypes(data);
};

const validatePartial = data => {
  const isPartial = Object.keys(PropertyTypes).some(property => (
    data.hasOwnProperty(property)
  ));

  if (!isPartial) {
    throw Error();
  }

  validateDataTypes(data);
};

module.exports = {
  validateQuery,
  validateEntity,
  validatePartial,
};

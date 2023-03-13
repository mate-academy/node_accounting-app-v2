'use strict';

const { ValidationError } = require('../exceptions/ValidationError');

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
          throw ValidationError.IncorrectType();
        }
        break;

      case 'number':
        if (typeof value !== 'number') {
          throw ValidationError.IncorrectType();
        }
        break;

      case 'Date':
        if (!Date.parse(data.spentAt)) {
          throw ValidationError.IncorrectType();
        }
        break;

      default:
      //
    }
  }
};

const validateQuery = (query) => {
  for (const [key, value] of Object.entries(query)) {
    switch (key) {
      case 'from':
      case 'to':
        if (!Date.parse(value)) {
          throw ValidationError.IncorrectType();
        }

        break;

      case 'userId':
        if (isNaN(+value)) {
          throw ValidationError.IncorrectType();
        }

        break;

      default:
        //
    }
  }
};

const validateEntity = data => {
  const hasRequiredProperties = requiredProperties.every(property => (
    data.hasOwnProperty(property)
  ));

  if (!hasRequiredProperties) {
    throw ValidationError.RequiredProperty();
  }

  validateDataTypes(data);
};

const validatePartial = data => {
  const isPartial = Object.keys(PropertyTypes).some(property => (
    data.hasOwnProperty(property)
  ));

  if (!isPartial) {
    throw ValidationError.RequiredProperty();
  }

  validateDataTypes(data);
};

module.exports = {
  validateQuery,
  validateEntity,
  validatePartial,
};

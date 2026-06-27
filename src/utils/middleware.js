const requireFields = ({ body = [], params = [], query = [] } = {}) => {
  return (req, res, next) => {
    const missing = {
      body: body.filter(field => !(field in req.body)),
      params: params.filter(field => !(field in req.params)),
      query: query.filter(field => !(field in req.query)),
    };

    if (missing.body.length || missing.params.length || missing.query.length) {
      return res.status(400).json({
        message: 'Required fields are missing',
        missing,
      });
    }

    next();
  };
};

module.exports = requireFields;

'use strict';

const getId = (req, url) => {
  const newUrl = new URL(req.url, `http://${req.headers.host}`);
  const paths = newUrl.pathname.split('/');
  const id = paths[paths.length - 1];

  return id;
};

module.exports = {
  getId,
};

class BaseController {
  constructor(service) {
    this.service = service;
  }

  getAll = (request, response) => {
    response.send(this.service.get());
  };

  getOne = (request, response) => {
    const { paramsId } = request.params;

    if (Number.isNaN(+paramsId)) {
      return response.status(400).json({
        message: 'Invalid id',
      });
    }

    const userFound = this.service.getById(+paramsId);

    if (!userFound) {
      return response.status(404).json({
        message: 'Resource not found',
      });
    }

    response.json(userFound);
  };

  createOne = (request, response) => {
    const body = request.body;

    const newUser = this.service.createOne(body);

    response.status(201).json(newUser);
  };

  deleteOne = (request, response) => {
    const { paramsId } = request.params;

    if (Number.isNaN(+paramsId)) {
      return response.status(400).json({
        message: 'Invalid id',
      });
    }

    const userFound = this.service.getById(+paramsId);

    if (!userFound) {
      return response.status(404).json({
        message: 'Resource not found',
      });
    }

    this.service.deleteOne(+paramsId);

    response.sendStatus(204);
  };

  updateOne = (request, response) => {
    const { paramsId } = request.params;
    const responseUser = request.body;

    if (Number.isNaN(+paramsId)) {
      return response.status(400).json({
        message: 'Invalid id',
      });
    }

    const userFound = this.service.getById(+paramsId);

    if (!userFound) {
      return response.status(404).json({
        message: 'Resource not found',
      });
    }

    this.service.updateOne({ ...responseUser, id: +paramsId });

    response.json(this.service.getById(+paramsId));
  };
}

module.exports = BaseController;

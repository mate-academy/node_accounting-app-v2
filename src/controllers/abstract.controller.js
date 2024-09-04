class AbstractController {
  constructor(service) {
    this.service = service;
  }

  getAll(req, res) {
    res.json(this.service.getAll(req.query));
  }

  getOne(req, res) {
    const id = req.params.id;
    const entity = this.service.getById(id);

    if (!entity) {
      return res.sendStatus(404);
    }

    res.json(entity);
  }

  create(req, res) {
    const { errors, data } = this.service.parseCreateData(req.body);

    if (errors.length > 0) {
      return res.sendStatus(400);
    }

    res.status(201).json(this.service.create(data));
  }

  deleteOne(req, res) {
    const id = req.params.id;
    const entity = this.service.getById(id);

    if (!entity) {
      return res.sendStatus(404);
    }

    this.service.deleteOne(req.params.id);

    res.sendStatus(204);
  }

  update(req, res) {
    const entity = this.service.getById(req.params.id);

    if (!entity) {
      return res.sendStatus(404);
    }

    const { errors, data } = this.service.parseUpdateData(req.body);

    if (errors.length > 0) {
      return res.sendStatus(400);
    }

    const updatedEnity = this.service.update(req.params.id, data);

    res.json(updatedEnity);
  }
}

module.exports = AbstractController;

import HttpException from "./HttpException";

class ExpanseNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Expanse with id ${id} not found`);
  }
}

export default ExpanseNotFoundException;

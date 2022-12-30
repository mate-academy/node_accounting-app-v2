import { RequestHandler } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import HttpException from "../exceptions/HttpException";

function validationMiddleware(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return async (req, _res, next) => {
    const errors = await validate(plainToClass(type, req.body), {
      skipMissingProperties,
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints))
        .join(", ");
      next(new HttpException(400, message));
    } else {
      next();
    }
  };
}

export default validationMiddleware;

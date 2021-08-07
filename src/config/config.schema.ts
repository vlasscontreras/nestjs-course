import {
  object as configObject,
  string as configString,
  number as configNumber,
} from '@hapi/joi';

export const configValidationSchema = configObject({
  // Database.
  DB_HOST: configString().required(),
  DB_PORT: configNumber().default(3306).required(),
  DB_NAME: configString().required(),
  DB_USERNAME: configString().required(),
  DB_PASSWORD: configString().required(),

  // JWT.
  JWT_SECRET: configString().required(),
});

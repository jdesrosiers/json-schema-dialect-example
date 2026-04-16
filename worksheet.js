import { registerSchema, validate } from "@hyperjump/json-schema";
import loadDialect from "./src/index.js";

loadDialect();

const schemaUri = "https://example.com/main";
registerSchema({
  $schema: "https://example.com/dialect/example",

  foo: "foo",
  bar: 42
}, schemaUri);

const output = await validate(schemaUri, 42);
console.log(output);

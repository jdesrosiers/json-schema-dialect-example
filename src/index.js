import { defineVocabulary, addKeyword } from "@hyperjump/json-schema/experimental";
import * as Schema from "@hyperjump/browser";
import { registerSchema } from "@hyperjump/json-schema/draft-2020-12";

export default () => {
  const dialectUri = "https://example.com/dialect/example";
  const vocabularyUri = "https://example.com/vocabulary/example";

  defineVocabulary(vocabularyUri, {
    foo: "https://example.com/keyword/foo",
    bar: "https://example.com/keyword/bar"
  });

  addKeyword({
    id: "https://example.com/keyword/foo",

    compile(keywordNode) {
      return Schema.value(keywordNode);
    },

    interpret() {
      return true;
    }
  });

  addKeyword({
    id: "https://example.com/keyword/bar",

    compile(keywordNode) {
      return Schema.value(keywordNode);
    },

    interpret() {
      return true;
    }
  });

  registerSchema({
    $schema: "https://json-schema.org/draft/2020-12/schema",

    properties: {
      foo: {
        type: "string"
      },
      bar: {
        type: "number"
      }
    }
  }, vocabularyUri);

  registerSchema({
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $vocabulary: {
      "https://json-schema.org/draft/2020-12/vocab/core": true,
      "https://json-schema.org/draft/2020-12/vocab/applicator": true,
      "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
      "https://json-schema.org/draft/2020-12/vocab/validation": true,
      "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
      "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
      "https://json-schema.org/draft/2020-12/vocab/content": true,
      [vocabularyUri]: true
    },
    $dynamicAnchor: "meta",

    allOf: [
      { $ref: "https://json-schema.org/draft/2020-12/schema" },
      { $ref: vocabularyUri }
    ]
  }, dialectUri);
};

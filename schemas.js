const BaseJoi = require("joi");
const sanitizeHTML = require("sanitize-html");

const Joi = BaseJoi.extend((joi) => {
  return {
    type: "string",
    base: joi.string(),
    messages: {
      "string.escapeHTML": "{{#label}} must not include HTML!",
    },
    rules: {
      escapeHTML: {
        validate(value, helpers) {
          const sanitizedText = sanitizeHTML(value, {
            allowedTags: [],
            allowedAttributes: {},
          });
          if (sanitizedText !== value)
            return helpers.error("string.escapeHTML", { value });
          return sanitizedText;
        },
      },
    },
  };
});

module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    location: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
  }).required(),
  "delete-images": Joi.array(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required().escapeHTML(),
  }).required(),
});

import { body } from "express-validator";

const PresenceCreateValidations = [
  body('type').not().isEmpty().withMessage("type diperlukan"),
  body('faceFeature').not().isEmpty().withMessage("facefeature diperlukan"),
  body('photo').not().isEmpty().withMessage("photo diperlukan"),
  body('cropped_photo').not().isEmpty().withMessage("cropped photo diperlukan"),
]

export { PresenceCreateValidations };


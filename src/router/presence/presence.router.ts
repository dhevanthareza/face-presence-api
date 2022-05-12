import { Router } from "express";
import { asyncHandler } from "../../modules/core/helpers/asyncHandler";
import isAuthenticated from "../../modules/core/middlewares/auth.middleware";
import { fileMiddleware } from "../../modules/core/middlewares/file.middleware";
import { PresenceController } from "../../modules/presence/presence.controller";

const PresenceRouter = Router()
const PresenceControllerObj = new PresenceController()

// PresenceRouter.get('/', UserControllerObj.getAll)
PresenceRouter.get('/datatable', isAuthenticated, PresenceController.datatable)
PresenceRouter.get('/today', isAuthenticated, PresenceController.today)
// PresenceRouter.get('/:id', UserControllerObj.get)
PresenceRouter.post(
  '/',
  isAuthenticated,
  fileMiddleware({ fields: [{ name: 'photo', maxCount: 1 }, { name: 'cropped_photo', maxCount: 1 }] }),
  asyncHandler(PresenceController.presence)
)
// PresenceRouter.put('/:id', UserControllerObj.update)
// PresenceRouter.delete('/:id', UserControllerObj.delete)

export { PresenceRouter };


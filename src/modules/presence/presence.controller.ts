import { Response } from "express";
import { AppController } from "../core/controller/app.controller";
import { ResponseService } from "../core/service/response.service";
import ValidateService from "../core/service/validate.service";
import { PresenceRepository } from "./presence.repository";
import { PresenceCreateValidations } from "./presence.validation";

class PresenceController extends AppController {
  constructor() {
    super({ repository: PresenceRepository })
  }

  public async presence(req: any, res: Response) {
    await ValidateService(req, PresenceCreateValidations)
    const { type, faceFeature, photo, cropped_photo } = req.body;
    const userId = req.user.id
    await PresenceRepository.addPresence({ userId, type, faceFeature, photo, cropped_photo })
    ResponseService.success(res, {}, "Berhasil melakukan presensi")
  }
}

export { PresenceController };


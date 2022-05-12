import { Response } from "express";
import { ResponseService } from "../core/service/response.service";
import ValidateService from "../core/service/validate.service";
import { PresenceRepository } from "./presence.repository";
import { PresenceCreateValidations } from "./presence.validation";

class PresenceController {
  public static async presence(req: any, res: Response) {
    await ValidateService(req, PresenceCreateValidations)
    const { type, faceFeature, photo, cropped_photo } = req.body;
    const userId = req.user.id
    await PresenceRepository.addPresence({ userId, type, faceFeature, photo, cropped_photo })
    ResponseService.success(res, {}, "Berhasil melakukan presensi")
  }
  static async  datatable(req: any, res: any) {
    const page = req.query.page || '1';
    const limit = req.query.limit || '15';
    const search = req.query.search || '';
    const data = await PresenceRepository.datatable(req.user.id, { page, limit, search });
    return ResponseService.success(res, data, "SUCCESS")
  }
  static async today(req: any, res: any) {
    const data = await PresenceRepository.todayData();
    return ResponseService.success(res, data, "SUCCESS")
  }
}

export { PresenceController };


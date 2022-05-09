import ApplicationError from "../core/helpers/errorHandler";
import { AppRepository, IRepositoryOptions } from "../core/repository/app.repository";
import { UserModel } from "../user/user.model";
import { PresenceModel } from "./presence.model";
import { PresenceFailedModel } from "./presenceFailed.model";

class PresenceRepository extends AppRepository {
  public static options: IRepositoryOptions = {
    model: PresenceModel,
  }

  public static async addPresence({ userId, type, faceFeature, photo, cropped_photo }: { userId: String, type: String, faceFeature: Array<any>, photo: object, cropped_photo: object }) {
    const user = await UserModel.findById(userId)
    const userFaceFeature = user.photo_feature
    const faceDistance = this.euclideanDistance(faceFeature, userFaceFeature);
    if (faceDistance >= 0.9) {
      await PresenceFailedModel.create({
        userId,
        type,
        date: Date.now(),
        photo,
        cropped_photo,
        photo_feature: faceFeature,
      })
      throw new ApplicationError({message: "Validasi Wajah Gagal"})
    }
    await PresenceModel.create({
      userId,
      date: Date.now(),
      [type == "IN" ? 'check_in_datetime' : 'check_out_datetime']: Date.now(),
      distance: faceDistance,
      photo,
      cropped_photo,
      photo_feature: faceFeature,
    })
  }

  private static euclideanDistance(e1: Array<any>, e2: Array<any>): number {
    let sum: number = 0.0
    for (let i: number = 0; i < e1.length; i++) {
      sum += Math.pow((e1[i] - e2[i]), 2)
    }
    return sum
  }
}
export { PresenceRepository };


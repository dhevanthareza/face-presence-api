import ApplicationError from "../core/helpers/errorHandler";
import { IDataTableOptions } from "../core/typing/datatableOptions.type";
import { UserModel } from "../user/user.model";
import { PresenceModel } from "./presence.model";
import { PresenceFailedModel } from "./presenceFailed.model";

class PresenceRepository {

  public static async addPresence({ userId, type, faceFeature, photo, cropped_photo }: { userId: String, type: String, faceFeature: Array<any>, photo: object, cropped_photo: object }) {
    console.log(type);
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
        distance: faceDistance,
        photo_feature: faceFeature,
      })
      throw new ApplicationError({ message: "Validasi Wajah Gagal" })
    }
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayPresence = await PresenceModel.findOne({ userId }).where('date').gte(Date.parse(startOfToday.toISOString()))
    if (todayPresence != null) {
      await PresenceModel.updateOne({ _id: todayPresence.id }, {
        [type == "IN" ? 'check_in_datetime' : 'check_out_datetime']: Date.now(),
        [type == "IN" ? 'distance' : 'check_out_distance']: faceDistance,
        [type == "IN" ? 'photo' : 'check_out_photo']: photo,
        [type == "IN" ? 'cropped_photo' : 'check_out_cropped_photo']: cropped_photo,
        [type == "IN" ? 'photo_feature' : 'check_out_photo_feature']: faceFeature,
      })
    } else {
      await PresenceModel.create({
        userId,
        date: Date.parse(startOfToday.toISOString()),
        [type == "IN" ? 'check_in_datetime' : 'check_out_datetime']: Date.now(),
        [type == "IN" ? 'distance' : 'check_out_distance']: faceDistance,
        [type == "IN" ? 'photo' : 'check_out_photo']: photo,
        [type == "IN" ? 'cropped_photo' : 'check_out_cropped_photo']: cropped_photo,
        [type == "IN" ? 'photo_feature' : 'check_out_photo_feature']: faceFeature,
      })
    }
  }

  public static async datatable(
    userId: String,
    datatableOptions: IDataTableOptions = { limit: '5', page: '1', search: '' },
  ) {
    const offset = parseInt(datatableOptions.limit, 10) * (parseInt(datatableOptions.page, 10) - 1);
    const limit = parseInt(datatableOptions.limit, 10);
    // let where = {};
    // if (this.Options.canSearchField.length > 0) {
    //   where = {
    //     ...where,
    //     [Op.or]: this.Options.canSearchField.map((el: string) => {
    //       return {
    //         [el]: {
    //           [Op.like]: `%${datatableOptions.search}%`,
    //         },
    //       };
    //     }),
    //   };
    // }
    const query = PresenceModel.find({ userId }).select("-photo_feature -check_out_photo_feature").toConstructor()
    const data = await (new query()).skip(offset).limit(limit).sort([['createdAt', -1]]).exec()

    const count = await PresenceModel.estimatedDocumentCount()
    return { count, result: data };
  }

  public static async todayData(userId: String) {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayPresence = await PresenceModel.findOne({ userId }).where('createdAt').gte(Date.parse(startOfToday.toISOString())).select("-photo_feature -check_out_photo_feature")
    return todayPresence
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


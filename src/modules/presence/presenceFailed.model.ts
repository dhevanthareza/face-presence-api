import { model, Schema } from "mongoose";

interface IPresenceFailed {
  userId: string,
  date: Date;
  type: string;
  photo: object;
  cropped_photo: object;
  photo_feature: any[];
}

const presenceFailedSchema = new Schema<IPresenceFailed>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String},
  cropped_photo: { type: Object, required: true },
  photo_feature: { type: Array(), required: true },

}, { timestamps: true });

const PresenceFailedModel = model<IPresenceFailed>('PresenceFailed', presenceFailedSchema)

export { PresenceFailedModel, IPresenceFailed };


import { model, Schema } from "mongoose";

interface IPresence {
  userId: string,
  date: Date;
  check_in_datetime: Date;
  check_out_datetime: Date;
  photo: object;
  cropped_photo: object;
  photo_feature: any[];
  distance: number;
}

const presenceSchema = new Schema<IPresence>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  check_in_datetime: { type: Date, required: false },
  check_out_datetime: { type: Date, required: false },
  cropped_photo: { type: Object, required: true },
  photo_feature: { type: Array(), required: true },
  distance: {type: Number, required: true}

}, { timestamps: true });

const PresenceModel = model<IPresence>('Presence', presenceSchema)

export { PresenceModel, IPresence };


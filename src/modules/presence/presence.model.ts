import { model, Schema } from "mongoose";

interface IPresence {
  userId: string,
  date: Date;
  check_in_datetime?: Date;
  check_out_datetime?: Date;
  photo: object;
  check_out_photo: object;
  cropped_photo: object;
  check_out_cropped_photo: object;
  photo_feature: any[];
  check_out_photo_feature: any[];
  distance?: number;
  check_out_distance?: number;
}

const presenceSchema = new Schema<IPresence>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  check_in_datetime: { type: Date, required: false },
  check_out_datetime: { type: Date, required: false },
  cropped_photo: { type: Object, required: false },
  check_out_cropped_photo: { type: Object, required: false },
  photo_feature: { type: Array(), required: false },
  check_out_photo_feature: { type: Array(), required: false },
  photo: { type: Object, required: false },
  check_out_photo: { type: Object, required: false },
  distance: {type: Number, required: false},
  check_out_distance: {type: Number, required: false}

}, { timestamps: true });

const PresenceModel = model<IPresence>('Presence', presenceSchema)

export { PresenceModel, IPresence };


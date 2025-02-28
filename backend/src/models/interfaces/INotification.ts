import { GeneralNotification } from "../dto/GeneralNotification";
import { ENotificationCast } from "../enums/ENotificationCast";

export interface INotification {
  cast: ENotificationCast;
  userId: number | null;
  payload: GeneralNotification;
}
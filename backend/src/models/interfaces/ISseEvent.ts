import { ECast } from "../enums/ECast";
import { ESseEventType } from "../enums/ESseEventType";

export interface ISseEvent {
  cast: ECast
  userId?: number
  type: ESseEventType
  data: any
}
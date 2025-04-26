import Lector1Png from '../static/images/Lector_1.png'
import Lector2Png from '../static/images/Lector_2.png'
import Lector3Png from '../static/images/Lector_3.png'
import Lector4Png from '../static/images/Lector_4.png'
import Lector5Png from '../static/images/Lector_5.png'
import Lector6Png from '../static/images/Lector_6.png'
import Lector7Png from '../static/images/Lector_7.png'
import Lector8Png from '../static/images/Lector_8.png'

import {
  KOST,
  SHEVCHENO,
  HNYLOSKURENKO,
  HAITOVICH,
  GUK,
  TARASUK,
  HLYBOVA,
  ALUSEF,
} from '../constants/predefinedAvatars'

function usePredefinedAvatar(avatar) {
  const avatars = {
    [KOST]: Lector1Png,
    [SHEVCHENO]: Lector2Png,
    [HNYLOSKURENKO]: Lector3Png,
    [HAITOVICH]: Lector4Png,
    [GUK]: Lector5Png,
    [TARASUK]: Lector6Png,
    [HLYBOVA]: Lector7Png,
    [ALUSEF]: Lector8Png,
  }

  return avatars[avatar]
}

export default usePredefinedAvatar

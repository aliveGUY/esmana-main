import { registerAs } from '@nestjs/config';

export default registerAs('way-for-pay', () => ({
  merchantLogin: process.env.MERCHANT_LOGIN || 'test_merch_n1',
  merchantSecretKey: process.env.MERCHANT_SECRET_KEY || 'flk3409refn54t54t*FNJRET',
}));

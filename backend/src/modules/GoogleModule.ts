import { Module } from "@nestjs/common";
import { GoogleClient } from "src/infrastructure/GoogleClient";

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'IGoogleClient',
      useClass: GoogleClient
    },

  ],
  exports: ['IGoogleClient'],
})

export class GoogleModule { }

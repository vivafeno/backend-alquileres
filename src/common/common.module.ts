import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { AddressModule } from './address/address.module';


@Module({
  imports: [CompanyModule, AddressModule]
})
export class CommonModule {}

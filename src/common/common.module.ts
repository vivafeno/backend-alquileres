import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { AddressModule } from './address/address.module';
import { ContactModule } from './contact/contact.module';


@Module({
  imports: [CompanyModule, AddressModule, ContactModule]
})
export class CommonModule {}

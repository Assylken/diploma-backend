import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}
  @UseGuards(JwtGuard)
  @Get('getCountry/:id')
  async getCountry(@Param('id') id: string) {
    return this.countryService.getCountry(+id);
  }
  @Get('all')
  async getAllCountry() {
    return this.countryService.getAllCountry();
  }
}

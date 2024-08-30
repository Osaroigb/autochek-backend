import * as https from 'https';
import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class RapidApiService {
  constructor() {}

  // constructor(private readonly configService: ConfigService) {}
  // private rapidApiHost: string = this.configService.get<string>('RAPID_API_HOST');
  // private rapidApiKey: string = this.configService.get<string>('RAPID_API_KEY');

  async getValuation(vin: string): Promise<any> {
    const options = {
      method: 'GET',
      hostname: process.env.RAPID_API_HOST,
      port: null,
      path: `/vehicle-lookup?vin=${vin}`,
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': process.env.RAPID_API_HOST,
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(body));
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }
}

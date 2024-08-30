import * as https from 'https';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RapidApiService {
  private rapidApiHost: string = 'vin-lookup2.p.rapidapi.com';
  private rapidApiKey: string ='2795187f41mshd52a12aebd0fac1p13d74bjsne1b8105830ab';

  async getValuation(vin: string): Promise<any> {
    const options = {
      method: 'GET',
      hostname: this.rapidApiHost,
      port: null,
      path: `/vehicle-lookup?vin=${vin}`,
      headers: {
        'x-rapidapi-key': this.rapidApiKey,
        'x-rapidapi-host': this.rapidApiHost,
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

import { Injectable } from '@nestjs/common';
import { transferSharesDoc, TransferSharesDoc } from 'data/investor-new/transfer-shares';


@Injectable()
export class TransferSharesService {
  findAll(): TransferSharesDoc[] {
    return transferSharesDoc;
  }
  findByYear(year: string): TransferSharesDoc[] {
    return transferSharesDoc.filter(data => data.year === year);
  }
}

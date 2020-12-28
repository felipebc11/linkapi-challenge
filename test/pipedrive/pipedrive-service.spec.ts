import { PipedriveService } from '../../src/services/pipedrive/pipedrive.service';
import { wonDeals } from './mocks/won-deals.mock';

describe('PipeDrive Service test', () => {
  const pipedriveService = new PipedriveService();
  describe('Given clearWonDeals method', () => {
    describe('when valid won deals array was been sent', () => {
      it('should return array containing', () => {
        const expectReturn = [
          {
            date: '2020-12-24',
            salesValue: 25,
            title: 'teste deal'
          }
        ];
        expect(pipedriveService['clearWonDeals'](wonDeals)).toEqual(
          expectReturn
        );
      });
    });
  });
});

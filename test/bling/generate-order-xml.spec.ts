import { generateOrderXML } from '../../src/services/bling/generate-order-xml';
import { orderMock } from './mocks/order-xml.mock';
describe('Given generateOrderXML function', () => {
  describe('when valid name and date has been sent', () => {
    it('should return dynamic xml strig', () => {
      expect(generateOrderXML('Felipe', '2020-12-28')).toEqual(orderMock);
    });
  });
});

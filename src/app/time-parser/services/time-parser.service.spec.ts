import { TimeParserService } from './time-parser.service';

describe('TimeParserService', () => {
  let service: TimeParserService;

  beforeEach(() => {
    service = new TimeParserService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Alphabetical Characters', () => {
    it('should parse a to empty', () => {
      expect(service.parseTime('a')).toBe('');
    });
    it('should parse ABC to empty', () => {
      expect(service.parseTime('ABC')).toBe('');
    });
    it('should parse space to empty', () => {
      expect(service.parseTime(' ')).toBe('');
    });
  });

  describe('English Times', () => {
    // False cases
    it('should parse 22 to empty', () => {
      expect(service.parseTime('22')).toBe('');
    });

    it('should parse 22 PM to empty', () => {
      expect(service.parseTime('22PM')).toBe('');
    });

    // True cases
    it('should parse 1 to 1 PM', () => {
      expect(service.parseTime('1')).toBe('01:00 PM');
    });

    it('should parse 1am to 1 AM', () => {
      expect(service.parseTime('1am')).toBe('01:00 AM');
    });

    it('should parse 130 to 1:30 PM', () => {
      expect(service.parseTime('130')).toBe('01:30 PM');
    });

    it('should parse 321 to 03:21 PM', () => {
      expect(service.parseTime('321')).toBe('03:21 PM');
    });

    it('should parse 321am to 03:21 AM', () => {
      expect(service.parseTime('321am')).toBe('03:21 AM');
    });

    it('should parse 130am to 1:30 AM', () => {
      expect(service.parseTime('130am')).toBe('01:30 AM');
    });

    it('should parse 1:30 to 1:30 PM', () => {
      expect(service.parseTime('1:30')).toBe('01:30 PM');
    });

    it('should parse 1:30am to 1:30 AM', () => {
      expect(service.parseTime('1:30am')).toBe('01:30 AM');
    });

    it('should parse 12 to 12 PM', () => {
      expect(service.parseTime('12')).toBe('12:00 PM');
    });

    it('should parse 12am to 12 AM', () => {
      expect(service.parseTime('12am')).toBe('12:00 AM');
    });
  });

  describe('French Times / Military time', () => {
    it('should parse 22 to 22:00', () => {
      expect(service.parseTime('22', true)).toBe('22:00');
    });

    it('should parse 223 to 22:30', () => {
      expect(service.parseTime('223', true)).toBe('22:30');
    });

    it('should parse 22:3 to 22:30', () => {
      expect(service.parseTime('22:3', true)).toBe('22:30');
    });

    it('should parse 2238 to 22:38', () => {
      expect(service.parseTime('2238', true)).toBe('22:38');
    });

    it('should parse 22:38 to 22:38', () => {
      expect(service.parseTime('22:38', true)).toBe('22:38');
    });

    it('should parse 9 to 09:00', () => {
      expect(service.parseTime('9', true)).toBe('09:00');
    });

    it('should parse 09 to 09:00', () => {
      expect(service.parseTime('09', true)).toBe('09:00');
    });

    it('should parse 093 to 09:30', () => {
      expect(service.parseTime('093', true)).toBe('09:30');
    });

    it('should parse 0930 to 09:30', () => {
      expect(service.parseTime('0930', true)).toBe('09:30');
    });

    it('should parse 09:30 to 09:30', () => {
      expect(service.parseTime('09:30', true)).toBe('09:30');
    });

    it('should parse 17 to 17:00', () => {
      expect(service.parseTime('17', true)).toBe('17:00');
    });

    it('should parse 173 to 17:30', () => {
      expect(service.parseTime('173', true)).toBe('17:30');
    });

    it('should parse 17:3 to 17:30', () => {
      expect(service.parseTime('17:3', true)).toBe('17:30');
    });

    it('should parse 321 to 03:21', () => {
      expect(service.parseTime('321', true)).toBe('03:21');
    });

    it('should strip AM/PM if entered', () => {
      expect(service.parseTime('1PM', true)).toBe('01:00');
      expect(service.parseTime('1AM', true)).toBe('01:00');
      expect(service.parseTime('130PM', true)).toBe('13:00');
      expect(service.parseTime('130AM', true)).toBe('13:00');
      expect(service.parseTime('1:30PM', true)).toBe('01:30');
      expect(service.parseTime('1:30AM', true)).toBe('01:30');
      expect(service.parseTime('12:30PM', true)).toBe('12:30');
      expect(service.parseTime('12:30AM', true)).toBe('12:30');
    });
  });
});

/**
 * EXPORT FUNCTIONS TO TEST THIS FILE WITH JEST
 */
import { priceFormatter, sanitizePricePunctuation, sanitizePriceSigns, someURL } from './helpers';

describe('sanitizePriceSigns', () => {
  const testCases = [
    { input: '3 US$', expected: '3'},
    { input: '33 US$', expected: '33'},
    { input: '3,9 US$', expected: '3,9'},
    { input: '36,9 US$', expected: '36,9'},
    { input: '36,99 US$', expected: '36,99'},
    { input: '366,99 US$', expected: '366,99'},
    { input: '36,99 US$', expected: '36,99'},
    { input: '3.666 US$', expected: '3.666'},
    { input: '3.666,99 US$', expected: '3.666,99'},
    { input: ' 3 US$', expected: '3'},
    { input: ' 33 US$', expected: '33'},
    { input: ' 3,9 US$', expected: '3,9'},
    { input: ' 36,9 US$', expected: '36,9'},
    { input: ' 36,99 US$', expected: '36,99'},
    { input: ' 366,99 US$', expected: '366,99'},
    { input: ' 36,99 US$', expected: '36,99'},
    { input: ' 3.666 US$', expected: '3.666'},
    { input: ' 3.666,99 US$', expected: '3.666,99'},
    { input: 'ARS$ 1,222.43', expected: '1,222.43'},
    { input: 'US$ 1,222.43', expected: '1,222.43'},
    { input: '$ 1,222.43', expected: '1,222.43'},
    { input: ' ARS$ 1,222.43', expected: '1,222.43'},
    { input: 'ARS$1,222.43', expected: '1,222.43'},
    { input: 'ARS$ 1,222.43+', expected: '1,222.43'},
    { input: 'US$ 1,222.43+', expected: '1,222.43'},
    { input: '$ 1,222.43+', expected: '1,222.43'},
    { input: ' ARS$ 1,222.43 +', expected: '1,222.43'},
    { input: 'ARS$1,222.43 +', expected: '1,222.43'},
    { input: ' ARS$ 1,222.43 +', expected: '1,222.43'},
    { input: 'US$ 1,222.43 +', expected: '1,222.43'},
    { input: '$ 1,222.43 +', expected: '1,222.43'},
    { input: ' ARS$ 1,222.43 +', expected: '1,222.43'},
    { input: 'ARS$1,222.43 +', expected: '1,222.43'},
  ];

  test.each(testCases)('converts "$input" to "$expected"', ({ input, expected }) => {
    expect(sanitizePriceSigns(input)).toBe(expected);
  });

  // Additional edge cases
  test('handles empty string', () => {
    expect(sanitizePriceSigns('')).toBe('');
  });

  test('handles string with only currency symbol', () => {
    expect(sanitizePriceSigns('US$')).toBe('');
  });

  test('handles string with only spaces', () => {
    expect(sanitizePriceSigns('   ')).toBe('');
  });

  test('handles string with only plus sign', () => {
    expect(sanitizePriceSigns('+')).toBe('');
  });

  test('handles null input', () => {
    expect(() => sanitizePriceSigns(null)).toThrow();
  });

  test('handles undefined input', () => {
    expect(() => sanitizePriceSigns(undefined)).toThrow();
  });
});

describe('sanitizePricePunctuation', () => {
  const testCases = [
    { input: '1.234,55', expected: 1234.55 },
    { input: '1,234.55', expected: 1234.55 },
    { input: '1234,55', expected: 1234.55 },
    { input: '1234.55', expected: 1234.55 },
    { input: '111,22', expected: 111.22 },
    { input: '111.22', expected: 111.22 },
    { input: '11,22', expected: 11.22 },
    { input: '11.22', expected: 11.22 },
    { input: '1,22', expected: 1.22 },
    { input: '1.22', expected: 1.22 },
    { input: '1,2', expected: 1.2 },
    { input: '1.2', expected: 1.2 },
    { input: 1.2, expected: 1.2},
    { input: 1, expected: 1},
  ];

  test.each(testCases)('converts "$input" to "$expected"', ({ input, expected }) => {
    expect(sanitizePricePunctuation(input)).toBe(expected);
  });

  // Additional edge cases
  test('handles empty string', () => {
    expect(() => sanitizePricePunctuation('')).toThrow();
  });

  test('handles string with only spaces', () => {
    expect(() => sanitizePricePunctuation('   ')).toThrow();
  });

  test('handles string with only decimal separator', () => {
    expect(() => sanitizePricePunctuation('.')).toThrow();
    expect(() => sanitizePricePunctuation(',')).toThrow();
  });


  test('handles string with invalid characters', () => {
    expect(() => sanitizePricePunctuation('abc')).toThrow();
    expect(() => sanitizePricePunctuation('12.34.56')).toThrow();
    expect(() => sanitizePricePunctuation('12,34,56')).toThrow();
  });

  test('handles null input', () => {
    expect(() => sanitizePricePunctuation(null)).toThrow();
  });

  test('handles undefined input', () => {
    expect(() => sanitizePricePunctuation(undefined)).toThrow();
  });
});

describe('someURL', () => {
  const testCases = [
    { arr: ['page'], url: 'https://mypage.com/', expected: true },
    { arr: ['page'], url: 'https://mypage.com/subpage', expected: true },

    { arr: ['mypage'], url: 'https://mypage.com/page/subpage', expected: true },
    { arr: ['subpage'], url: 'https://mypage.com/page/subpage', expected: true },
    { arr: ['/page'], url: 'https://mypage.com/page/subpage', expected: true },
    { arr: ['page/subpage'], url: 'https://mypage.com/page/subpage', expected: true },
    { arr: ['/page', '/subpage'], url: 'https://mypage.com/page/subpage', expected: true },
    { arr: ['com'], url: 'https://mypage.com/page/subpage', expected: true },

    { arr: ['test'], url: 'https://mypage.com/page/subpage', expected: false },
    { arr: [], url: 'http://mypage.com/page', expected: false },
    { arr: ['mypage.com'], url: '', expected: false },
    { arr: [], url: '', expected: false },
    { arr: ['mypage'], url: null, expected: false },
    { arr: ['mypage'], url: undefined, expected: false },

    { arr: null, url: 'https://mypage.com', expected: false },
    { arr: undefined, url: 'https://mypage.com', expected: false },
    { arr: [null], url: 'https://mypage.com', expected: false },
    { arr: [undefined], url: 'https://mypage.com', expected: false },
    { arr: [null, undefined], url: 'https://mypage.com', expected: false },
    { arr: null, url: null, expected: false },
    { arr: null, url: null, expected: false },
    { arr: undefined, url: undefined, expected: false },
  ];

  test.each(testCases)('returns $expected for array $arr and url $url', ({ arr, url, expected }) => {
    expect(someURL(arr, url)).toBe(expected);
  });
});

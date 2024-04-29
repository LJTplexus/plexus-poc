import { BoldPipe } from './bold.pipe';

describe('BoldPipe', () => {
  let pipe: BoldPipe;

  beforeEach(() => {
    pipe = new BoldPipe();
  });

  it('should transform string to bold', () => {
    const input = 'This is *bold* text';
    const output = pipe.transform(input);
    expect(output).toBe('This is <strong>bold</strong> text');
  });

  it('should handle multiple instances of bold text', () => {
    const input = 'This *is* bold *text*';
    const output = pipe.transform(input);
    expect(output).toBe('This <strong>is</strong> bold <strong>text</strong>');
  });

  it('should handle no bold text', () => {
    const input = 'Example test';
    const output = pipe.transform(input);
    expect(output).toBe('Example test');
  });
});

import { describe, it, expect } from 'vitest';
import { objectCaseSelector } from './endingSelector';

describe('objectCaseSelector 함수 테스트', () => {
  it("'을'이 적절한 경우 반환", () => {
    const result = objectCaseSelector('사과');
    expect(result).toBe('을');
  });

  it("'를'이 적절한 경우 반환", () => {
    const result = objectCaseSelector('바나나');
    expect(result).toBe('를');
  });

  it("빈 문자열 입력 시 '를' 반환", () => {
    const result = objectCaseSelector('');
    expect(result).toBe('를');
  });
});

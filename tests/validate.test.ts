import { describe, expect, it } from 'vitest';
import { runValidation } from '../scripts/validate-content';

describe('validate:content', () => {
  it('sem problemas', () => {
    expect(runValidation()).toEqual([]);
  });
});

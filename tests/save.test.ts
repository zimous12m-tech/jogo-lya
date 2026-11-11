// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { addCoins, load, recordLevelResult } from '../src/services/save';

beforeEach(() => window.localStorage.clear());

describe('save', () => {
  it('persiste moedas', () => {
    addCoins(15);
    expect(load().coins).toBe(15);
  });
  it('guarda a melhor pontuacao', () => {
    recordLevelResult('mundo-1-nivel-1', 1);
    recordLevelResult('mundo-1-nivel-1', 3);
    recordLevelResult('mundo-1-nivel-1', 2);
    expect(load().stars['mundo-1-nivel-1']).toBe(3);
  });
  it('recupera default com JSON corrompido', () => {
    window.localStorage.setItem('coruja.save.v3', '{oops');
    expect(load().coins).toBe(0);
  });
});

import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { CellMark } from '../models/game.model';
import { TicTacToeService, checkWinner } from './tic-tac-toe.service';

describe('checkWinner', () => {
  it('detects a row win', () => {
    const board: CellMark[] = ['X', 'X', 'X', '', '', '', '', '', ''];
    expect(checkWinner(board)).toBe('X');
  });

  it('detects a column win', () => {
    const board: CellMark[] = ['O', '', '', 'O', '', '', 'O', '', ''];
    expect(checkWinner(board)).toBe('O');
  });

  it('detects a diagonal win', () => {
    const board: CellMark[] = ['X', '', '', '', 'X', '', '', '', 'X'];
    expect(checkWinner(board)).toBe('X');
  });

  it('returns null when no winner', () => {
    const board: CellMark[] = ['X', 'O', 'X', 'O', 'X', 'O', '', '', ''];
    expect(checkWinner(board)).toBeNull();
  });
});

describe('TicTacToeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('starts with X and empty board', () => {
    const svc = TestBed.inject(TicTacToeService);
    svc.reset();
    const s = svc.state();
    expect(s.currentPlayer).toBe('X');
    expect(s.board.every((c) => c === '')).toBe(true);
    expect(s.gameStatus).toBe('active');
  });

  it('ignores occupied cells', () => {
    const svc = TestBed.inject(TicTacToeService);
    svc.reset();
    svc.playMove(0);
    svc.playMove(0);
    expect(svc.state().board[0]).toBe('X');
  });

  it('detects draw', () => {
    const svc = TestBed.inject(TicTacToeService);
    svc.reset();
    // Full board, no winning line (verified manually).
    const moves = [4, 0, 8, 2, 6, 3, 5, 7, 1];
    for (const m of moves) {
      svc.playMove(m);
    }
    const s = svc.state();
    expect(s.gameStatus).toBe('draw');
    expect(s.isDraw).toBe(true);
  });
});

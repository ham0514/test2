import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TicTacToeService } from '../../services/tic-tac-toe.service';

@Component({
  standalone: true,
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.scss',
})
export class TicTacToePage implements OnInit {
  readonly game = inject(TicTacToeService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.game.reset();
  }

  cellLabel(index: number): string {
    const s = this.game.state();
    const mark = s.board[index];
    if (mark) {
      return `Cell ${index + 1}, ${mark}`;
    }
    return `Cell ${index + 1}, empty`;
  }

  statusMessage(): string {
    const s = this.game.state();
    if (s.gameStatus === 'won' && s.winner) {
      return `Player ${s.winner} wins!`;
    }
    if (s.gameStatus === 'draw') {
      return "It's a draw.";
    }
    return `Player ${s.currentPlayer}'s turn`;
  }

  play(index: number): void {
    this.game.playMove(index);
  }

  reset(): void {
    this.game.reset();
  }

  backToMenu(): void {
    void this.router.navigate(['/menu']);
  }
}

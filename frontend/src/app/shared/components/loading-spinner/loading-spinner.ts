import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    @if (visivel()) {
      <div class="spinner-overlay">
        <mat-spinner diameter="48" />
        @if (mensagem()) {
          <p class="spinner-mensagem">{{ mensagem() }}</p>
        }
      </div>
    }
  `,
  styles: [
    `
      .spinner-overlay {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding: 24px;
      }

      .spinner-mensagem {
        color: #666;
        font-size: 14px;
        margin: 0;
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  visivel = input<boolean>(false);
  mensagem = input<string>('');
}

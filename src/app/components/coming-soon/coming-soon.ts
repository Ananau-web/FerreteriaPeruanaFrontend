import { Component } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  template: `
    <div class="coming-soon">
      <div class="coming-soon-card">
        <div class="coming-soon-icon">
          <i class="bi bi-gear-wide-connected"></i>
        </div>
        <h3 class="coming-soon-title">Módulo en Desarrollo</h3>
        <p class="coming-soon-text">
          Este módulo se encuentra en construcción y estará disponible en próximas iteraciones del proyecto.
        </p>
        <div class="coming-soon-badge">
          <i class="bi bi-clock me-1"></i> Próximamente
        </div>
      </div>
    </div>
  `,
  styles: [`
    .coming-soon {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      animation: fadeInUp 0.5s ease-out;
    }

    .coming-soon-card {
      text-align: center;
      padding: 48px;
      max-width: 400px;
    }

    .coming-soon-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      border-radius: 20px;
      background: rgba(21, 101, 192, 0.08);
      color: #1565c0;
      font-size: 36px;
      margin-bottom: 24px;
      animation: pulse 2s ease-in-out infinite;
    }

    .coming-soon-title {
      font-size: 22px;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0 0 10px;
    }

    .coming-soon-text {
      font-size: 13.5px;
      color: #6c757d;
      margin: 0 0 20px;
      line-height: 1.6;
    }

    .coming-soon-badge {
      display: inline-flex;
      align-items: center;
      background: rgba(255, 143, 0, 0.1);
      color: #e65100;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 16px;
      border-radius: 20px;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.05); }
    }
  `]
})
export class ComingSoonComponent {}

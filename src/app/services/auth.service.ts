import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginResponse {
  token: string;
  nombreCompleto: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.url}/auth`;
  private readonly TOKEN_KEY = 'fp_token';
  private readonly USER_KEY = 'fp_user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify({
          nombreCompleto: response.nombreCompleto,
          rol: response.rol
        }));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUsuario(): { nombreCompleto: string; rol: string } | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  getNombreCompleto(): string {
    return this.getUsuario()?.nombreCompleto ?? 'Usuario';
  }

  getRol(): string {
    return this.getUsuario()?.rol ?? '';
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decodificar payload del JWT para verificar expiración
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiracion = payload.exp * 1000; // a milisegundos
      return Date.now() < expiracion;
    } catch {
      return false;
    }
  }
}

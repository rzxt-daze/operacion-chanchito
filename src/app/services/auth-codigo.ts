import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthCodigoService {
  private STORAGE_KEY = 'ahorro_pareja_codigo';
  private USER_KEY = 'ahorro_pareja_usuario';

  guardarSesion(codigo: string, nombre: string, avatar: string) {
    localStorage.setItem(this.STORAGE_KEY, codigo);
    localStorage.setItem(this.USER_KEY, JSON.stringify({ nombre, avatar }));
  }

  getCodigoActivo(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  getDatosUsuario(): { nombre: string; avatar: string } | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  cerrarSesion() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
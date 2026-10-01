import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

// Rutas ajustadas a tus archivos actuales en la carpeta services
import { AhorroService } from '../../services/ahorro';
import { AuthCodigoService } from '../../services/auth-codigo';

@Component({
  selector: 'app-ingreso-codigo',
  templateUrl: './ingreso-codigo.page.html',
  styleUrls: ['./ingreso-codigo.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class IngresoCodigoPage implements OnInit {
  modoVista: string = 'seleccion';
  nombreUsuario: string = '';
  avatarSeleccionado: string = 'avatar1.png';
  codigoIngresado: string = '';
  avatares: string[] = ['avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png'];

  constructor(
    private ahorroService: AhorroService,
    private authCodigoService: AuthCodigoService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    const codigoGuardado = this.authCodigoService.getCodigoActivo();
    if (codigoGuardado) {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  cambiarVista(modo: string) {
    this.modoVista = modo;
  }

  generarCodigo(): string {
    const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
  }

  async crearNuevoAhorro() {
    if (!this.nombreUsuario.trim()) {
      this.mostrarToast('Por favor, ingresa tu nombre');
      return;
    }

    const loader = await this.loadingCtrl.create({ message: 'Creando espacio compartido...' });
    await loader.present();

    const nuevoCodigo = this.generarCodigo();

    try {
      await this.ahorroService.crearAhorroConjunto(nuevoCodigo, {
        nombre: this.nombreUsuario,
        avatar: this.avatarSeleccionado
      });

      this.authCodigoService.guardarSesion(nuevoCodigo, this.nombreUsuario, this.avatarSeleccionado);
      
      await loader.dismiss();
      this.mostrarToast(`¡Creado con éxito! Tu código es: ${nuevoCodigo}`);
      this.router.navigate(['/tabs/tab1']);
    } catch (error) {
      await loader.dismiss();
      this.mostrarToast('Ocurrió un error al crear el espacio');
    }
  }

  async unirseConCodigo() {
    const codigoClean = this.codigoIngresado.trim().toUpperCase();

    if (!this.nombreUsuario.trim()) {
      this.mostrarToast('Por favor, ingresa tu nombre');
      return;
    }

    if (codigoClean.length !== 6) {
      this.mostrarToast('El código debe tener exactamente 6 caracteres');
      return;
    }

    const loader = await this.loadingCtrl.create({ message: 'Buscando espacio...' });
    await loader.present();

    try {
      const existe = await this.ahorroService.verificarCodigoExistente(codigoClean);

      if (existe) {
        await this.ahorroService.unirseAAhorro(codigoClean, {
          nombre: this.nombreUsuario,
          avatar: this.avatarSeleccionado
        });

        this.authCodigoService.guardarSesion(codigoClean, this.nombreUsuario, this.avatarSeleccionado);

        await loader.dismiss();
        this.mostrarToast('¡Te has unido exitosamente!');
        this.router.navigate(['/tabs/tab1']);
      } else {
        await loader.dismiss();
        this.mostrarToast('Código no encontrado. Verifica con tu pareja.');
      }
    } catch (error) {
      await loader.dismiss();
      this.mostrarToast('Error al conectar con la base de datos');
    }
  }

  async mostrarToast(msj: string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
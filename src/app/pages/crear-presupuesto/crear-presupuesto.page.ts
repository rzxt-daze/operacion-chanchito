import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.page.html',
  styleUrls: ['./crear-presupuesto.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CrearPresupuestoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

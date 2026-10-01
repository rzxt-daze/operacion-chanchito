import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorroService {
  private firestore: Firestore = inject(Firestore);

  async verificarCodigoExistente(codigo: string): Promise<boolean> {
    const docRef = doc(this.firestore, `ahorros_conjuntos/${codigo}`);
    const snapshot = await getDoc(docRef);
    return snapshot.exists();
  }

  async crearAhorroConjunto(codigo: string, usuario: { nombre: string, avatar: string }) {
    const docRef = doc(this.firestore, `ahorros_conjuntos/${codigo}`);
    return setDoc(docRef, {
      codigo: codigo,
      fondo_total: 0,
      usuario1: usuario,
      usuario2: null,
      fechaCreacion: new Date()
    });
  }

  async unirseAAhorro(codigo: string, usuario: { nombre: string, avatar: string }) {
    const docRef = doc(this.firestore, `ahorros_conjuntos/${codigo}`);
    return updateDoc(docRef, {
      usuario2: usuario
    });
  }
}
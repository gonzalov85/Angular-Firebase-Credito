import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TarjetaCredito } from '../models/TarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(private firebase: AngularFirestore) { }

  guardarTarjeta(tarjeta: TarjetaCredito): Promise<any>{
    return this.firebase.collection('tarjetas').add(tarjeta);
  }

  obtenerTarjeta(): Observable<any>{
    //snapshotChanges es un get sincronizado va a ctualizando los cambios
    return this.firebase.collection('tarjetas').snapshotChanges(); }
}

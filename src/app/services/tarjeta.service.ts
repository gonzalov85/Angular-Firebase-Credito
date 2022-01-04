import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { TarjetaCredito } from '../models/TarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private tarjeta$= new Subject<any>();

  constructor(private firestore: AngularFirestore) { }

  guardarTarjeta(tarjeta: TarjetaCredito): Promise<any>{
    return this.firestore.collection('tarjetas').add(tarjeta);
  }

  editarTarjeta(id:string, tarjeta: any): Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).update(tarjeta);
  }

  obtenerTarjeta(): Observable<any>{
    //snapshotChanges es un get sincronizado va a ctualizando los cambios
    return this.firestore.collection('tarjetas', ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges(); 
  }

  eliminarTarjeta(id: string): Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).delete();
  }

  addTarjetaEdit(tarjeta: TarjetaCredito){
    this.tarjeta$.next(tarjeta);
  }

  getTarjetaEdit(): Observable<TarjetaCredito>{
    return this.tarjeta$.asObservable();
  }
}

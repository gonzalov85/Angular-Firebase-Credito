import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  listTarjetas: TarjetaCredito[] = [];

  constructor(private _tarjetaService: TarjetaService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
      this._tarjetaService.obtenerTarjeta().subscribe(doc =>{
        this.listTarjetas = [];
        doc.forEach((element: any) => {
          this.listTarjetas.push({
            id:element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        console.log(this.listTarjetas);
    })
  }
  eliminarTarjeta(id:any){
    this._tarjetaService.eliminarTarjeta(id).then(()=>{

    }, error => {
      console.log(error);
    })
  }
}

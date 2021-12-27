import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private _tarjetaSerice: TarjetaService,
              private toastr: ToastrService) { 
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }

  ngOnInit(): void {
  }

  crearTarjeta(){
    const TARJETA: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    
    this.loading = true;
    this._tarjetaSerice.guardarTarjeta(TARJETA).then(()=>{
      console.log("tarjeta registrada");
      this.toastr.success("La tarjeta fué registrada con exito", "Tarjeta registrada");
      this.loading = false;
      this.form.reset();
    }, error =>{
      this.toastr.error("Ocurrio un error", "Error");
      this.loading = false;
      console.log(error);
    })
  }

}

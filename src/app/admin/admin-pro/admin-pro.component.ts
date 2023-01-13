import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GuardarIdService } from 'src/app/guardar-id.service';

@Component({
  selector: 'app-admin-pro',
  templateUrl: './admin-pro.component.html',
  styleUrls: ['./admin-pro.component.css']
})
export class AdminProComponent implements OnInit {
  datos:any;
  form:any;
  mensajeStatus:Boolean=false;
  mensajeTexto:String="";

  constructor(public idservice:GuardarIdService,private formBuilder:FormBuilder, private router:Router) { 
    this.form = this.formBuilder.group({
    id: [this.idservice.id, [] ],
    titulo: ["",[] ],
    texto: ["",[] ],
    foto: ["",[] ],
    enlace: ["",[] ]
    })
  }

  ngOnInit(): void {
    this.limpiarMensaje();

    if (this.idservice.id == undefined) {
      console.error("ERROR: id undefined, volviendo a perfil");
      this.router.navigate(['/elegir']);
    } 
    console.log("Admin seccion educacion");
    this.datos = [];
    
    this.mensajeStatus=true;
    this.mensajeTexto="Base de datos...";
    fetch("https://portfolio-v3d1.onrender.com/basededatos/proyects/"+this.idservice.id)
      .then(data => data.json())
      .then(data => {
        this.datos = data;
        this.limpiarMensaje();
      })
      .catch(Error => {
        this.mensajeStatus=true;
        this.mensajeTexto=Error;
      })
  }

  borrar(idABorrar:String) {
    this.mensajeStatus=true;
    this.mensajeTexto="Borrando linea...";
    fetch("https://portfolio-v3d1.onrender.com/basededatos/borrar/proyect/"+idABorrar).then(
      data => this.ngOnInit()
    ).catch(error => this.mensajeTexto=error);
  }

  enviando(data:any) {
    console.log("ENVIANDO proyecto");
    this.limpiarMensaje();
    this.mensajeStatus=true;
    this.mensajeTexto="Cargando datos...";

    let url = "https://portfolio-v3d1.onrender.com/cargando/proyect";
    data.id=String(this.idservice.id);
    let datos = {id : data.id, titulo : data.titulo, texto : data.texto, foto : data.foto, enlace : data.enlace};
    console.log(datos);

    fetch(url, {
	    method: 'POST',
	    body: JSON.stringify(datos),
	    headers:{
		    'Content-Type':'application/json'
      }
    }).then(res=>res.json())
    .catch(error=> {
      console.error("ERROR: FALLO EL FETCH \n "+error)
      
      this.mensajeStatus=true;
      this.mensajeTexto="Error cargando datos";
    })
    .then(resp => {
      console.log("cargado en base de datos");
      this.form.reset();
      this.ngOnInit();
    })
  }

  limpiarMensaje() {
    this.mensajeStatus=false;
    this.mensajeTexto="";
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardarIdService } from '../guardar-id.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}

import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-superheroes',
  imports: [Navbar],
  templateUrl: './superheroes.html',
  styleUrl: './superheroes.css',
})
export class Superheroes {}

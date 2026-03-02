import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Pokemon as PokemonModel } from '../../models/pokemon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  imports: [Navbar,CommonModule,FormsModule],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class Pokemon implements OnInit{

  private http=inject(HttpClient);
  pokemons=signal<PokemonModel[]>([]);

  ngOnInit(): void {
   this.http.get<PokemonModel[]>('assets/pokemon.json').subscribe({
    next:(res)=>this.pokemons.set(res),
    error:(err)=>console.error('Error cargando pokemon', err)    
   });
  }

  busqueda=signal('');
 pokemonsFiltrados = computed(() => 
  this.pokemons().filter(p => 
    p.nombre.toLowerCase().includes(this.busqueda().toLowerCase())
  )
);
}

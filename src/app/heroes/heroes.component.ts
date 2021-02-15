import { Component, Injectable, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Hero } from '../hero';
import { HeroAction } from '../hero.actions';
import { HeroState } from '../hero.state';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  @Select(HeroState.heroes) heroes$: Observable<Hero[]>

  constructor(private store: Store) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(new HeroAction.Load())
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.store.dispatch(new HeroAction.Add({ name } as Hero))
  }


  delete(hero: Hero): void {
    this.store.dispatch(new HeroAction.Delete(hero))
  }

}

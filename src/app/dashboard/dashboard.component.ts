import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Hero } from '../hero';

import { HeroAction } from '../hero.actions';
import { HeroState } from '../hero.state';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Select(HeroState.heroes) heroes$: Observable<Hero[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.store.dispatch(new HeroAction.Load())
  }

}

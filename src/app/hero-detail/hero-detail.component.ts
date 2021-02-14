import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Select, Store } from '@ngxs/store';
import { HeroState } from '../hero.state';
import { Observable } from 'rxjs';
import { HeroAction } from '../hero.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Select(HeroState.selectedHero) hero$: Observable<Hero>

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.store.dispatch(new HeroAction.Select(id));
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    this.store.dispatch(new HeroAction.Update(hero))
    .subscribe(() => this.goBack());
  }

}

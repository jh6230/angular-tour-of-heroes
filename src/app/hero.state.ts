import { Action, Selector, State, StateContext } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';

import { Hero } from "./hero";
import { HeroAction } from './hero.actions';
import { HeroService } from './hero.service';



export class HeroStateModel {
  selectedHero: Hero;
  heroes: Hero[];
}

@State<HeroStateModel>({
  name: 'heroes',
  defaults: {
    selectedHero: null,
    heroes: []
  }
})

export class HeroState {

  constructor(private heroService: HeroService) { }

  //ヒーロー一覧
  @Selector()
  static heroes(state: HeroStateModel) {
    return state.heroes;
  }

  //選択中のヒーロー
  @Selector()
  static selectedHero(state: HeroStateModel) {
    return state.selectedHero;
  }

  @Action(HeroAction.Select)
  load(ctx: StateContext<HeroStateModel>, action: HeroAction.Select) {
    const id = action.id;
    return this.heroService.getHero(id)
      .pipe(
        tap((data: Hero) => {
          ctx.patchState({
            selectedHero: data
          });
        }),
      )
  }

  @Action(HeroAction.Add)
  addHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Add) {
    const hero = action.playload;

    return this.heroService.addHero(hero).pipe(
      finalize(() => {
        ctx.dispatch(new HeroAction.Load());
      });
    );
  }

  @Action(HeroAction.Delete)
  deleteHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Delete) {
    const hero = action.playload;
    const id = typeof hero === 'number' ? hero : hero.id;

    return this.heroService.deleteHero(hero).pipe(
      finalize(() => {
        ctx.dispatch(new HeroAction.Load());
      }):
    );
  }

  @Action(HeroAction.Update)
  updateHero(ctx: StateContext<HeroStateModel>, action: HeroAction.Update) {
    const hero = action.playload

    return this.heroService.updateHero(hero)
  }

}

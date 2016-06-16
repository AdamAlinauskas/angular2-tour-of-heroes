import{Component, OnInit} from '@angular/core';
import { Router } from '@angular/router-deprecated';

import {Hero} from './hero';
import {HeroService} from './hero.service'


@Component({
    selector:'my-heroes',
    templateUrl:'app/heroes.component.html',
    styleUrls:['app/heroes.component.css'],
})

export class HeroesComponent implements OnInit {
    selectedHero: Hero;

    heroes: Hero[];

    constructor(private heroService: HeroService, private router:Router) { }

    onSelect(hero: Hero){
        this.selectedHero = hero;
    }

    getHeroes(){
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit(){
        this.getHeroes();
    }

    gotoDetail(){
        let link = ["HeroDetail",{id:this.selectedHero.id}]
        this.router.navigate(link);
    }
}

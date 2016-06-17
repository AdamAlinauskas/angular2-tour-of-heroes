import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Hero} from './hero'

import { RouteParams,Router } from '@angular/router-deprecated';
import { HeroService } from './hero.service';

@Component({
selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls:['app/hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit{
  @Input() 
  hero: Hero;
  
  @Output() 
  close1 = new EventEmitter<Hero>();
  
  error: any;

  isStandAloneViewForCreate:boolean;
  
  navigated = false; // true if navigated here

    constructor(private heroService: HeroService, private routeParams: RouteParams, private router:Router) {
    
    }

  ngOnInit() {
    if (this.routeParams.get('id') !== null) {
      let id = +this.routeParams.get('id');
      this.navigated = true;
      this.heroService.getHero(id)
          .then(hero => this.hero = hero);
    } else {
      this.navigated = false;
      this.hero = new Hero();
    }
    let currentRoute = this.router.generate(['CreateHero'])
    if(currentRoute.urlPath == location.pathname.replace('/','')){
      this.isStandAloneViewForCreate = true;
    }
  }

  save() {
    this.heroService
        .save(this.hero)
        .then(hero => {
          this.hero = hero; // saved hero, w/ id if new
          this.goBack(hero);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }


    goBack(savedHero: Hero = null) {
      this.close1.emit(savedHero);

      if(this.isStandAloneViewForCreate)
        this.router.navigate(['Heroes']); 

     if (this.navigated) { window.history.back(); }
    }

    

}

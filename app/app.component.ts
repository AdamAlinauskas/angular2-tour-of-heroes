import {Component} from '@angular/core';
import {HeroesComponent} from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';


@RouteConfig([
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault:true
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
    },

])

@Component({
    selector:'my-app',
    template:`<h1>{{title}}</h1>
           <nav>
                <a [routerLink]="['Dashboard']">Dashboard</a> | 
                <a [routerLink]="['Heroes']">Heroes</a>
            </nav>
            <router-outlet></router-outlet>
    `,
    styleUrls:['app/app.component.css'],
    directives:[ROUTER_DIRECTIVES],
    providers:[ROUTER_PROVIDERS,HeroService]
})

export class AppComponent{
    title: string = 'Tour of heroes';

    constructor(private heroService:HeroService){
        
    }
}

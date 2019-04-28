import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RoutePartsService } from './shared/services/route-parts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appTitle = '';
  public pageTitle = '';

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService
  ) {}

  ngOnInit() {
    this.changePageTitle();
  }

  changePageTitle() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(routeChange => {
        const routeParts = this.routePartsService.generateRouteParts(
          this.activeRoute.snapshot
        );
        if (!routeParts.length) { return this.title.setTitle(this.appTitle); }
        // Extract title from parts;
        this.pageTitle = routeParts
          .reverse()
          .map(part => part.title)
          .reduce((partA, partI) => {
            return `${partA} > ${partI}`;
          });
        this.pageTitle += ` | ${this.appTitle}`;
        this.title.setTitle(this.pageTitle);
      });
  }
}

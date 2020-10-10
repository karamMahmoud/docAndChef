import { filter } from "rxjs/operators";
import {
  Component,
  OnInit,
  ContentChild,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  PopStateEvent,
} from "@angular/common";

import { NavbarComponent } from "./components/navbar/navbar.component";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { GlobalEventsManager } from "./helper/global-events";
import { Subscription } from "rxjs";
import PerfectScrollbar from "perfect-scrollbar";
import { TranslateService } from "@ngx-translate/core";

// declare const $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  showNavBar: boolean = false;

  // @ContentChild(NavbarComponent, {static: false}) navbar : NavbarComponent;
  // @ContentChild(NavbarComponent, {static: false}) navbar : NavbarComponent;
  @ViewChild(NavbarComponent, { static: false }) navbar: NavbarComponent;

  // @ViewChild('test', {read: ElementRef})

  // @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(
    private translate: TranslateService,
    private elRef: ElementRef,
    public location: Location,
    private router: Router,
    private globalEventsManager: GlobalEventsManager
  ) {
    translate.addLangs(["en", "ar"]);
    translate.setDefaultLang("en");
    let lang = localStorage.getItem("lang");
    if (!lang) {
      localStorage.setItem("lang", "en");
      translate.use("en");
      lang = "en";
    } else {
      translate.use(lang);
    }
    if (lang != "en") {
      this.loadStyleSheet("rtlcss", "./assets/css/rtl.css");
    }
  }

  ngOnInit() {
    // $.material.init();
    const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      window.scrollTo(0, 0);
    });
    this._router = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        elemMainPanel.scrollTop = 0;
      });
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      let ps = new PerfectScrollbar(elemMainPanel);
    }
  }
  ngAfterViewInit() {
    this.runOnRouteChange();
  }
  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    } else {
      return true;
    }
  }
  changeOfRoutes() {
    if (localStorage.getItem("etSparkToken")) {
      (document.querySelector(".main-panel") as HTMLElement).style.width = "";
      this.showNavBar = true;
    } else {
      (document.querySelector(".main-panel") as HTMLElement).style.width =
        "100%";
      this.showNavBar = false;
    }
  }
  loadStyleSheet(id, url) {
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    link.media = "all";
    head.appendChild(link);
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }
}

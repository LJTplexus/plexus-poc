import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/api/api.service';
import { HeroList } from 'src/app/shared/model/hero.interface';
import { SpinnerService } from 'src/app/shared/services/spinner.services';

@Component({
  selector: 'app-hero-component',
  templateUrl: './hero-component.component.html',
  styleUrls: ['./hero-component.component.scss'],
})
export class HeroComponent implements OnInit {
  @Input() filterHeroNameEvent = new EventEmitter<string>();
  @Input() heroDataModifyEvent = new EventEmitter<HeroList>();
  @Input() newHeroEvent = new EventEmitter<HeroList>();
  @Input() heroDataDeleteEvent = new EventEmitter<any>();

  @Output() heroData: HeroList[] = [];

  isLoading: boolean = true;

  constructor(
    private readonly _service: ApiService,
    public _snackBar: MatSnackBar,
    private readonly _view: ViewContainerRef,
    private readonly _spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.searchHero();
  }

  public searchHero(): void {
    this._spinnerService.show(this._view);
    this._service.getHero().subscribe((data) => {
      if (data) {
        this.heroData = data;
        this._spinnerService.hide(this._view);
      }
    });
  }

  searchHeroFilterName(heroName: string): void {
    this._service.getHeroByFilterName(heroName).subscribe(
      (data) => {
        this.heroData = data;
      },
      (error) => this._snackBar.open(error)
    );
  }

  createNewHero(heroData: HeroList): void {
    this._service.createHero(heroData).subscribe((data) => {
      if (data) {
        this._snackBar.open('Hero created', '', {
          duration: 2000,
        });
        this.heroData = data;
        this.searchHero();
      }
    });
  }

  editHero(heroData: HeroList): void {
    this._service.editHero(heroData.id, heroData).subscribe((data) => {
      if (data) {
        this._snackBar.open('Hero edited', '', {
          duration: 2000,
        });
        this.heroData = data;
        this.searchHero();
      } else {
        this._snackBar.open(`Cannot create new hero: ${data}`, '', {
          duration: 2000,
        });
      }
    });
  }

  eventReload(): void {
    this.searchHero();
  }

  deleteHero(heroId: number): void {
    this._service.deleteHero(heroId).subscribe((result) => {
      if (result) {
        this._snackBar.open('Hero deleted', '', {
          duration: 2000,
        });
        this.searchHero();
      }
    });
  }
}

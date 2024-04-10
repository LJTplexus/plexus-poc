import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HeroList } from '../model/hero.interface';
import { ApiService } from 'src/app/services/api/api.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { HeroDialogComponent } from '../dialog/hero-dialog.component';

/* export interface PeriodicElement {
  id: number;
  name: string;
  action: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen', action: 1.0079 },
]; */

@Component({
  selector: 'hero-table-component',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
})
export class HeroTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  // @Input() dataSource: HeroList[] = [];

  dataSource: HeroList[] = [];
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private readonly _service: ApiService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngOnInit() {
    this.searchHero();
  }
  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  searchHero(): void {
    // this.loader = true;
    this._service.getHero().subscribe(
      (data) => {
        this.dataSource = data;
        this.dataSource = data.map((element: HeroList) => {
          return this.buildDto(element);
        });
        // this.loader = false;
      },
      (err) => {
        /* this.loader = false;
      this.mostrarAviso(err); */
        alert(err);
      }
    );
  }

  buildDto(element: any): HeroList {
    return {
      id: element.id,
      heroName: element.heroName,
    };
  }

  editHero(heroSelected: string): void {
    this.dialog
      .open(HeroDialogComponent, {
        data: { heroSelected },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.searchHero();
        } else {
          alert('error');
        }
      });
  }

  deleteHero(heroSelected: string): void {
    this._service.deleteHero(heroSelected);
    /* .subscribe(
      (data) => {
        this.dataSource = data;
        this.dataSource = data.map((element: HeroList) => {
          return this.buildDto(element);
        });
        // this.loader = false;
      },
      (err) => {
        // this.loader = false;
        //this.mostrarAviso(err);
        alert(err);
      } */
    this.searchHero();
  }
}

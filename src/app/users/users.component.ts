import { Component,TemplateRef, Input , Inject, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../helper/services.api';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {fromEvent, merge, Observable, of as observableOf,BehaviorSubject} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { UsersService } from './users.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var $: any; 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  displayedColumns: string[] = ['id', 'name', 'email','actions'];
  userPermissions:any = JSON.parse(localStorage.getItem("permissions"))['users'];
  private dataTable :any;
  errorMessage: string;
  selectedRowId: any; 
  isRateLimitReached = false;
  isLoadingResults = false;
  resultsLength = 0;
  data:[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  constructor(public toastr: ToastrManager,private modalService: BsModalService, public router:Router,private changeDetectorRef: ChangeDetectorRef,
    private authenticationService:AuthenticationService,private _usersService:UsersService) { 
  }

  token=localStorage.getItem('etSparkToken');
  
  
  ngOnInit() {

  }

  ngAfterViewInit() {
	
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		fromEvent(this.searchInput.nativeElement, 'keyup').subscribe(() => this.paginator.pageIndex = 0)
		this.initDatatable();
	}

	initDatatable(){
		merge(this.sort.sortChange, this.paginator.page,fromEvent(this.searchInput.nativeElement, 'keyup'))
		.pipe(
		  startWith({}),
		  switchMap(() => {
			return this._usersService.getUsers(
			  this.displayedColumns.indexOf(this.sort.active), this.sort.direction, this.paginator.pageIndex,this.paginator.pageSize,this.searchInput.nativeElement.value);
		  }),
		  map(data => {
			// Flip flag to show that loading has finished.
      this.isRateLimitReached = false;
			this.isLoadingResults = false;
			this.resultsLength = data.recordsTotal;			  
			this.changeDetectorRef.markForCheck();
			return data.data;
		  }),
		  catchError(() => {				
			this.isLoadingResults = false;
			this.isRateLimitReached = true;
			this.changeDetectorRef.markForCheck();
			return observableOf([]);
		  })
		).subscribe(data => this.data = data);
	}

	ngOnDestroy() {
		//this.subscriptions.forEach(el => el.unsubscribe());
  }
  userId:any;

  delete(template: TemplateRef<any>,id) {
          this.userId = id;
    this.modalRef = this.modalService.show(template);
  }
    deleteUser(){
      this.modalRef.hide();
        this.authenticationService.deleteUser(this.userId,this.token).subscribe(data =>{
          this.initDatatable();
          this.toastr.successToastr(data['data']['message'], 'Success!');
                }, (err) => {
            }
            );
    }

    edit(rowId){
      this.router.navigate(['/users/edit-user'], { queryParams: { id: rowId } });
    }

}

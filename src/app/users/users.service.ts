// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../helper/services.api';

// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
// CRUD
//import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../../../../../../.._base/crud';
// Models
//import { ProductModel } from '../_models/product.model';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UsersService {

	constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }


	getUsers(sort: number, order: string, page: number, pageSize: number, search): Observable<any> {
		const href = `${this.authenticationService.baseUrl}/api/users`;
		const requestUrl =
			`${href}?${this.formatQueryStrings(sort, order, page, pageSize, search)}`;
		const token = localStorage.getItem("etSparkToken")
		return this.http.get<any>(requestUrl, {
			headers: {
				Authorization: `Bearer  ${token}`
			}
		});
	}

	formatQueryStrings(sort, order, page, pageSize, search) {
		if (sort < 0)
			sort = 1
		let query = {
			'columns[0][data]': 'id',
			'columns[0][name]': '',
			'columns[0][searchable]': 'false',
			'columns[0][orderable]': 'true',
			'columns[1][data]': 'name',
			'columns[1][name]': '',
			'columns[1][searchable]': 'true',
			'columns[1][orderable]': 'true',
			'columns[2][data]': 'email',
			'columns[2][name]': '',
			'columns[2][searchable]': 'true',
			'columns[2][orderable]': 'true',
			'columns[3][data]': '3',
			'columns[3][name]': '',
			'columns[3][searchable]': 'false',
			'columns[3][orderable]': 'false',
			'order[0][column]': sort,
			'order[0][dir]': order,
			'start': page * pageSize,
			'length': pageSize,
			'search[value]': search
		}
		let formattedString = '';
		Object.keys(query).forEach((key, index) => {
			formattedString += `${key}=${query[key]}`;
			formattedString += index + 1 == Object.keys(query).length ? '' : '&';
		});
		return formattedString;
	}

	getRoles(): any {
		return this
			.http
			.get(`${this.authenticationService.baseUrl}/api/roles`, this.jwt())
			.pipe(map((response) => { return response }));
	}

	addUser(user: any): Observable<any> {
		var formData = new FormData();
		Object.keys(user).forEach(function (key) {
			formData.append(key, user[key]);
		});
		return this
			.http
			.post(`${this.authenticationService.baseUrl}/api/users/`, formData, this.jwt())
			.pipe(map((res: Response) => res))
	}

	//update user data
	updateUser(user: any): Observable<any> {
		var formData = new FormData();
		Object.keys(user).forEach(function (key) {
			formData.append(key, user[key]);
		});
		formData.append('_method', 'PUT')
		return this
			.http
			.post(`${this.authenticationService.baseUrl}/api/users/${user.id}`, formData, this.jwt())
			.pipe(map((res: Response) => res))
	}

	// private helper methods
	private jwt() {
		// create authorization header with jwt token
		let token = localStorage.getItem('etSparkToken');
		let headers = new HttpHeaders({
			'Authorization': 'Bearer ' + token,
		});
		return ({ headers: headers });
	}
	check(err) {
		if (err.status !== 422) {
			// return this.handleErrors.handleErrors(err);
		} else {
			return Observable.throw(err);
		}
	}

}

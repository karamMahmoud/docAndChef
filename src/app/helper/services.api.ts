import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { Router } from "@angular/router";

import { HttpClient } from "@angular/common/http";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

/**
 * @class AuthenticationService
 * @classdesc AuthenticationService is mainly concentrated on the various API call which is related to dashboard
 * component. This contains Get,Post method calling through a common HttpService file for API Interaction.
 * @return Returns the API response obtained from server based upon the status ( Success or failure)
 * @author senthil.kumaran
 **/

@Injectable()
export class AuthenticationService {
  baseUrl = "https://drandchefbackend.modecollection.store/api";

  errorFunction(e) {
    if (e.status === 401) {
      localStorage.removeItem("etSparkToken");
      this.router.navigate(["./login"]);
    }
    if (e.status === 422) {
      return observableThrowError({
        type: "missingData",
        // message: JSON.parse(e._body),
      });
    }
    if (e.status === 500 || e.status === 503 || e.status === 400)
      return observableThrowError("serverError");
    if (e.status === 404) return observableThrowError("internetConnection");
    if (e.status === 429) return observableThrowError("toManyAttemps");
  }
  tokenAsHeader() {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem('drchefToken'),
      "x-app-locale": "ar",
    });
    return headers;
  }
  constructor(private router: Router, private http: HttpClient) {}
  // reset password
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  activeToken() {
    let token = localStorage.getItem("etSparkToken");
    let userToken = this.tokenAsHeader();
    return this.http
      .post(
        `${this.baseUrl}/api/auth/refresh-token`,
        {},
        { headers: userToken }
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e) => {
          return this.errorFunction(e);
        })
      )
      .subscribe(
        (data) => {
          let response = data;
          localStorage.setItem(
            "etSparkToken",
            response["data"]["access_token"]
          );
        },
        (err) => {
          localStorage.removeItem("etSparkToken");
          localStorage.removeItem("etName");
          this.router.navigate(["./login"]);
        }
      );
  }
  //get my data
  // getUserData(token: any): Observable<any> {
  getUserData(): any {
    let token = localStorage.getItem("etSparkToken");
    let userToken = this.tokenAsHeader();
    return this.http
      .get(`${this.baseUrl}/api/users/me`, { headers: userToken })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  menus(): any {
    return this.http.get(`${this.baseUrl}/menu`, { headers: this.tokenAsHeader() });
  }

  getPackage(): any {
    return this.http.get(`${this.baseUrl}/clients/package/details`, { headers: this.tokenAsHeader() });
  }

  getOrder(): any {
    return this.http.get(`${this.baseUrl}/orders/draft`, { headers: this.tokenAsHeader() });
  }

  setOrder(payload): any {
    return this.http.post(`${this.baseUrl}/orders/set`,payload, { headers: this.tokenAsHeader() });
  }

  packages(): any {
    return this.http.get(`${this.baseUrl}/packages`);
  }

  setPackages(payload): any {
    return this.http.post(`${this.baseUrl}/packages/set`, payload, { headers: this.tokenAsHeader() });
  }

  renewPackages(payload): any {
    return this.http.post(`${this.baseUrl}/packages/renew`, payload, { headers: this.tokenAsHeader() });
  }

  signup(payload): any {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  getUserDataAuth(): any {
    let token = localStorage.getItem("etSparkToken");
    let userToken = this.tokenAsHeader();
    return this.http.get(`${this.baseUrl}/api/users/me`, {
      headers: userToken,
    });
  }
  //get users data
  getUsersData(token: any): Observable<any> {
    let userToken = this.tokenAsHeader();
    return this.http
      .get(`${this.baseUrl}/api/users`, { headers: userToken })
      .pipe(
        map((res: Response) => res),
        catchError((e) => {
          return this.errorFunction(e);
        })
      );
  }
  //add new user data

  updateMe(payload: any): Observable<any> {
    let token = localStorage.getItem("etSparkToken");
    let userToken = this.tokenAsHeader();
    return this.http
      .put(`${this.baseUrl}/api/users/me`, payload, { headers: userToken })
      .pipe(map((res: Response) => res));
  }
  //delete user
  deleteUser(id: any, token: string) {
    let userToken = this.tokenAsHeader();
    return this.http
      .delete(`${this.baseUrl}/api/users/${id}`, { headers: userToken })
      .pipe(
        map((res: Response) => res),
        catchError((e) => {
          return this.errorFunction(e);
        })
      );
  }
  //get user data
  getUser(id: any, token: string): Observable<any> {
    let userToken = this.tokenAsHeader();

    return this.http
      .get(`${this.baseUrl}/api/users/${id}`, { headers: userToken })
      .pipe(
        map((res: Response) => res),
        catchError((e) => {
          return this.errorFunction(e);
        })
      );
  }
  //forget password
  forgetPassword(email: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/api/auth/forgot-password`, { email: email })
      .pipe(map((res: Response) => res));
  }
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/reset-password`, data).pipe(
      map((res: Response) => res),
      catchError((e) => {
        return this.errorFunction(e);
      })
    );
  }
  changepassword(data: any): Observable<any> {
    let token = localStorage.getItem("etSparkToken");
    let userToken = this.tokenAsHeader();
    return this.http
      .post(`${this.baseUrl}/api/auth/change-password`, data, {
        headers: userToken,
      })
      .pipe(map((res: Response) => res));
  }
  logout(): Observable<any> {
    let token = localStorage.getItem("etSparkToken");
    let userToken = this.tokenAsHeader();
    return this.http
      .post(`${this.baseUrl}/api/auth/logout`, {}, { headers: userToken })
      .pipe(
        map((res: Response) => res),
        catchError((e) => {
          return this.errorFunction(e);
        })
      );
  }
}

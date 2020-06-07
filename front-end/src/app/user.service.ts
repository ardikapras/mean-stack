import { Injectable } from '@angular/core';
import { User } from './User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUsersUrl = 'http://localhost:3000/users';
  options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) {
  }

  getUsers(): Observable<User[]> {
    // return USERS;
    return this.http.get<User[]>(this.apiUsersUrl)
  }

  saveUser(user: User): void {
    if (!user.id) {
      const rnd = Math.floor(Math.random() * 999).toString()
      user.id = rnd.padStart(5, '0')
      this.http.post<User>(this.apiUsersUrl, user, this.httpOptions).subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.error('There was an error during the request');
          console.log(error);
        })
    } else {
      this.http.patch<User>(this.apiUsersUrl + '/' + user.id, user, this.httpOptions).subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.error('There was an error during the request');
          console.log(error);
        })
    }
  }
}

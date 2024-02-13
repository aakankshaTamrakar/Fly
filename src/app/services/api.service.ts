import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public userUrl = "https://api.github.com/users"

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser():Observable<any[]> {
    return this.httpClient.get<any[]>(this.userUrl);
  }

  getUserRepos(username: string):Observable<any[]> {
    const url = `https://api.github.com/users/${username}/repos`;
    return this.httpClient.get<any[]>(url);
  }
  

  getUserData(username: string):Observable<any[]> {
    const url = `https://api.github.com/users/${username}`;
    return this.httpClient.get<any[]>(url);
  }
  

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}

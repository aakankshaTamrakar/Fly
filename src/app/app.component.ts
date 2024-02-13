import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  users: any[] = [];
  displayedUsers: any[] = [];
  currentPage: number = 1;
  pageSize: number = 1; 
  pagesToShow: number = 10;



  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getUser().subscribe(users => {
      //console.log(users);
      this.users = users;

      this.updateDisplayedUsers();

      this.users.forEach(user =>{
        this.getUserRepos(user);
        console.log(user)
      });
      this.users.forEach(user =>{
        this.getUserData(user);
        console.log(user)
      });
    });
  }

  getUserRepos(user: any):void{
    this.apiService.getUserRepos(user.login).subscribe(repos => {
      //console.log(repos)
      user.repos = repos;
    })
  }


  getUserData(user: any):void{
    this.apiService.getUserData(user.login).subscribe(data => {
      //console.log(repos)
      user.data = Array.isArray(data) ? data : [data];;
    })
  }

  updateDisplayedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedUsers = this.users.slice(startIndex, startIndex + this.pageSize);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }

  get pages(): number[] {
    let totalPages = this.totalPages;
    let startPage = Math.max(1, this.currentPage - Math.floor(this.pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + this.pagesToShow - 1);

    if (totalPages > this.pagesToShow && endPage - startPage < this.pagesToShow - 1) {
      startPage = Math.max(1, endPage - this.pagesToShow + 1);
    } 

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  }

}
  

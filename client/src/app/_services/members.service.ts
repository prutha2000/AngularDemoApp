import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../Models/Member';
import { PaginatedResult } from '../Models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber', page.toString())
      params = params.append('pageSize', itemsPerPage.toString())
    }

    return this.http.get<Member[]>(this.baseUrl + 'user', {observe: 'response', params}).pipe(
     map(response => {
      this.paginatedResult.result = response.body;
      if(response.headers.get('Pagination') != null){
        this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return this.paginatedResult;
     })
    )
  }

  getMember(username:string){
    const member = this.members.find(x => x.username == username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'user/'+username);
  }

  updateMember(member:Member){
    return this.http.put(this.baseUrl + 'user', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'user/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'user/delete-photo/' + photoId);
  }
}

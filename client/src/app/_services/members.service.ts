import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../Models/Member';
import { PaginatedResult } from '../Models/pagination';
import { User } from '../Models/user';
import { UserParams } from '../Models/UserParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
   }

   getUserParams(){
    return this.userParams;
   }

   setUserParams(params: UserParams){
    this.userParams = params;
   }

   resetUserPramas(){
    this.userParams = new UserParams(this.user);
   return this.userParams;
   }

  getMembers(userParams: UserParams) {
    debugger;
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response){
      return of(response);
    }
    let params = this.paginationHeaders(userParams.pageNumber, userParams.itemsPerPage);

    params = params.append('minAge',userParams.minAge.toString());
    params = params.append('maxAge',userParams.maxAge.toString());
    params = params.append('gender',userParams.gender);
    params = params.append('orderBy',userParams.orderBy);

    return this.GetPaginatedResult<Member[]>(this.baseUrl+ 'user', params);
    // .pipe(map(response => {
    //   this.memberCache.set(Object.values(userParams).join('-'), response);
    // }))
  }


  getMember(username:string){
    // const member = [...this.memberCache.values()]
    // .reduce((arr, elm) => arr.concat(elm.result), [])
    // .find((member: Member) => member.username === username);

    // if(member){
    //   return of(member);
    // }

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

  addLike(username: string){
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  getLikes(predicate: string, pageNumber, pageSize){
    let params = this.paginationHeaders(pageNumber, pageSize);

    params = params.append('predicate',predicate);
    return this.GetPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params);
  }

  private GetPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  
      return this.http.get<T>(url, { observe: 'response', params }).pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
    }
  
    private paginationHeaders(pageNumber: number, pageSize: number){
      let params = new HttpParams();
      
        params = params.append('pageNumber', pageNumber.toString());
        params = params.append('pageSize', pageSize.toString());
  
        return params
    }
}

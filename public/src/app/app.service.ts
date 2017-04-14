// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Comment }           from './comment';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
@Injectable()
export class CommentService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
     private commentsUrl = '/factories/8/login.json'; 
     
     getComments(name,password) : Observable<Comment[]> {

         // ...using get request
        var body= {"mobile":name,"encrypted_password":password};
        return this.http.post(this.commentsUrl, body)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }
      

}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router,Data } from "@angular/router";
import { map} from "rxjs";
import * as config from  '../../../server.config.json';


@Injectable()
export class AuthServices {
  
  private apiUrl: string = (config as any).apiurl;
    constructor(private http: HttpClient,private router: Router){ }

    login(params: any){
        return this.http.post(`${this.apiUrl}/login`, params)
        .pipe(
        map((response:Data) => {
            if(response["status"] == 1  && response["token"]){
                localStorage.setItem('jwtToken',response["token"]);
                localStorage.setItem('authUser',JSON.stringify(response['uDetails']));
                // this.router.navigate(['/protected-route']);
            }
                return response;
        })
        )
    }

    
    logout(){
        return this.http.get('/logout');
    }

}

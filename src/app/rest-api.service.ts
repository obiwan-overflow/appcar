import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


	const httpOptions = {
  		headers: new HttpHeaders({'Content-Type': 'application/json'})
	};
const apiUrl = "https://www.kai2car.com/api/index.php?route=";
// const apiUrl = "http://localhost/af1_web/public_html/api/ajax/api_app.php?type=";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  	constructor(private http: HttpClient) { }
  	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
		    // A client-side or network error occurred. Handle it accordingly.
		    console.error('An error occurred:', error.error.message);
		} else {
		    // The backend returned an unsuccessful response code.
		    // The response body may contain clues as to what went wrong,
		    console.error(
		      `Backend returned code ${error.status}, ` +
		      `body was: ${error.error}`);
		}
	  // return an observable with a user-facing error message
	  return throwError('Something bad happened; please try again later.');
	}

	private extractData(res: Response) {
	  	let body = res;
	  	return body || { };
	}
	getdata(url_string: string): Observable<any> {
	    const url = `${apiUrl}${url_string}`;
	    // console.log(url);
		return this.http.get(url).pipe(
	      map(this.extractData),catchError(this.handleError)
	    );
	}
	putdata(url_string: string,file:File): Observable<any> {
	    // const url = `${apiUrl}${url_string}`;
	    const url = "/testproxy";
	 //    const allowedOrigins = [
		//   'capacitor://localhost',
		//   'ionic://localhost',
		//   'http://localhost',
		//   'http://localhost:8080',
		//   'http://localhost:8100'
		// ];

	 //    const corsOptions = {
		//   origin: (origin, callback) => {
		//     if (allowedOrigins.includes(origin) || !origin) {
		//       callback(null, true);
		//     } else {
		//       callback(new Error('Origin not allowed by CORS'));
		//     }
		//   }
		// }
	    // this.http.options('*', cors(corsOptions));
		return this.http.post(url,file,{headers:{'Access-Control-Allow-Origin':"*"}});
	}
}

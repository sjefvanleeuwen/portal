import { Component, OnInit, Renderer2 } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { mapTo, delay } from 'rxjs/operators';
import jwt_decode = require('jwt-decode');
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-irma',
  templateUrl: './irma.component.html',
  styleUrls: ['./irma.component.scss']
})

export class IrmaComponent implements OnInit {

  url = 'https://privacybydesign.foundation/tomcat/irma_api_server/api/v2/issue/';
  JWTTest = '';
  header: any;
  payload: any;
  signature: any;
  timer: NodeJS.Timer = null;

  p1: string;
  p2: string;

  irma_api_server_address = 'http://10.109.0.178:8088';

  iat = Math.round((new Date()).getTime() / 1000) + 120;

  headers = new HttpHeaders({
    'Content-Type': 'text/plain',
    'Accept' : 'application/json, text/plain'
  });

  headers2 = new HttpHeaders({
    'Content-Type': 'text/plain',
    'Accept' : 'text/plain'
  });

  constructor(
    private renderer: Renderer2,
    private httpClient: HttpClient,
    private authService: AuthService)  { }

  doLogin(bsn: string) {
    this.authService.loginInwoner(Number(bsn));
  }

  getProof(token: string) {
    const s: string = 'http://10.109.0.178:8088/api/v2/verification/' + token + '/getproof';
    this.httpClient.get(s, {headers: this.headers2, responseType: 'text'}).subscribe((result: string) => {
      const jwt = JSON.parse(atob(result.split('.')[1]));
      this.doLogin(jwt.attributes['irma-demo.nijmegen.bsn.bsn']);
    });
  }

  disclose() {
    let header = {
      "alg": "none",
      "typ" : "JWT"
    };

    let payload = {
        "iat":  this.iat,
        "sub": "verification_request",
        "iss": "wigo4it",
        "sprequest": {
          "validity": 1569456000,
          "request": {
            "content": [
              {
                "label": "burgerservicenummer",
                "attributes": [
                  "irma-demo.nijmegen.bsn.bsn"
                ]
              }
            ]
          }
        }
      };

    const p1 = btoa(JSON.stringify(header)).replace(/=/g, '');
    const p2 = btoa(JSON.stringify(payload)).replace(/=/g, '');

    this.httpClient.post('http://0.0.0.0:8088/api/v2/verification',
      p1 + '.' + p2 + '.', {headers: this.headers}).subscribe((result: Object) => {
          const clone = JSON.parse(JSON.stringify(result));
          result.u = this.irma_api_server_address  + '/api/v2/verification/' + result.u;
          this.JWTTest = JSON.stringify(result);
          if (this.timer != null) {
            clearTimeout(this.timer);
            this.timer = null;
          }
          this.pollForScan(clone);
    });
  }

  public clone(): any {
    const cloneObj = new (<any>this.constructor());
    for (const attribut in this) {
        if (typeof this[attribut] === 'object') {
            cloneObj[attribut] = this.clone();
        } else {
            cloneObj[attribut] = this[attribut];
        }
    }
    return cloneObj;
  }

  pollForScan(clone: any) {
    this.httpClient.get('http://10.109.0.178:8088/api/v2/verification/' + clone.u + '/status?' + Math.random())
    .subscribe((innerResult: Object) => {
      if (innerResult === 'DONE') {
        // get results from IRMA API server
        this.getProof(clone.u);
        this.timer = null;
        return;
      }
      console.log(innerResult);
      this.timer = setTimeout(() => {
        this.pollForScan(clone);
      }, 1000);
  });

  }

  issue() {
    let header = {
      "alg": "none",
      "typ" : "JWT"
    }
 
    let payload = {
      "iss": "wigo4it",
      "iat": this.iat,
      "sub": "issue_request",
      "iprequest": {
        "timeout": 120,
        "data": "",
        "request": {
          "credentials": [
            {
              "validity": 1569456000,
              "keyCounter": 0,
              "credential": "irma-demo.wigo4it.stadspas",
              "attributes": {
                "stadspas": "yes"
              }
            }
          ],
          "disclose": []
        }
      }
    };
    this.p1 = btoa(JSON.stringify(header));
    this.p2 = btoa(JSON.stringify(payload));

    this.httpClient.post('http://0.0.0.0:8088/api/v2/issue',
      this.p1 + '.' + this.p2 + '.', {headers: this.headers}).subscribe((result: Object) => {
          result.u = this.irma_api_server_address  + '/api/v2/issue/' + result.u;
          this.JWTTest = JSON.stringify(result);
    });
  }

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode';



interface TokenDto {
  foo: string;
  exp: number;
  iat: number;
}

interface TokenHeaderDto {
  typ: string;
  alg: string;
}
@Component({
  selector: 'app-irma',
  templateUrl: './irma.component.html',
  styleUrls: ['./irma.component.scss']
})
export class IrmaComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  JWTTest = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkaXNjbG9zdXJlX3Jlc3VsdCIsImlzcyI6ImlybWFfYXBpX3NlcnZlciIsImF0dHJpYnV0ZXMiOnsicGJkZi5wYmRmLmlkaW4uZmFtaWx5bmFtZSI6InZhbiBMZWV1d2VuIn0sImV4cCI6MTUzNzc5MTMxNSwiaWF0IjoxNTM3NzkxMjU1LCJqdGkiOm51bGwsInN0YXR1cyI6IlZBTElEIn0.TkCDRH9Xc1vXAZtDr4DmjOJXbKfyk2nv9gPjKZCZnTFBwEm1sadnULzHAibsITb2n5YCVQ6bYXNSxLTIbJcYhorMqsPy4ft1crS2DsACHC6TIbS7SqpW8dSCx12bzD-LMQZeLNQBZfqI4MNvfcqy3GTII80q7k_hO-aauz5ODcRH4Ivlw3MzVfLpxrZWJ5pdJzlMvy8nhdZAObJ0uvYKKicjitqQokt_x_X1W_BhFpDtpoP1kTxhzhxjJ2iHClmCUH_w2w0Ofi2mEFjFRlyr6KAIxOArrNI49rQEKFiwI30f013_oJ_wbjWWc_Frt49Bzbl1iRhAMfT7vB7u2chukw';

  constructor() { }

  ngOnInit() {
   console.log(jwtDecode(this.JWTTest).attributes['pbdf.pbdf.idin.familyname']);
  }

}

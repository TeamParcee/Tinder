import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

declare var window;
@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  signInWithPhoneNumber(phoneNumber, appVerifier){
   return new Promise((resolve,reject)=>{
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        //window.confirmationResult = confirmationResult;
        return resolve(confirmationResult)
      }).catch(function (error) {
        // Error; SMS not sent
        // ...
        return reject(error)
      });
    })
  }
   confirmCode(code, confirmationResult: firebase.auth.ConfirmationResult){
    return new Promise((resolve, reject)=>{
        confirmationResult.confirm(code).then((result)=>{
            let user = result.user;
            return resolve(user);
        }).catch((error)=>{
          return reject(error)
        })
    })
  }
}

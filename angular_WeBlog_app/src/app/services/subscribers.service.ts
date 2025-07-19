import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // cspell:ignore firestore

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs: AngularFirestore) { }

  addSubs(subData: any) {
    this.afs.collection('subscribers').add(subData).then(() => {
      console.log('subscriber added');
      
    })
  }

  checkSubs(subEmail: any) {
    return this.afs.collection('subscribers', ref => ref.where('email', '==', subEmail)).get();
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // cSpell:ignore Firestore
import { map } from 'rxjs/operators';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr'; //cSpell:ignore toastr

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  loadData() {
    return this.afs
      .collection('subscribers')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as {
              name: string;
              email: string;
            };
            const id = a.payload.doc.id;
            return { id, ...data }; // Flattened structure
          });
        })
      );
  }

  deleteData(id: any) {
    this.afs
      .doc(`subscribers/${id}`) // Cleaner code using this method
      .delete()
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Category deleted successfully!', 'Success');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

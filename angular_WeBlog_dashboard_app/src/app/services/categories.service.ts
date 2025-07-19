import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // cSpell:ignore Firestore
import { ToastrService } from 'ngx-toastr'; // cSpell:ignore toastr
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  saveData(data: any) {
    this.afs
      .collection('categories')
      .add(data)
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Category added successfully!', 'Success');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadData() {
    return this.afs
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Category;
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  updateData(id: any, EditData: any) {
    this.afs
      .doc(`categories/${id}`)
      .update(EditData)
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Category updated successfully!', 'Success');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteData(id: any) {
    this.afs
      .doc(`categories/${id}`)          // Cleaner code using this method
      .delete()
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Category deleted successfully!', 'Success');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // deleteData(id: any) {
  //   this.afs
  //     .collection('categories')     // old method using collection
  //     .doc(id)
  //     .delete()
  //     .then((docRef) => {
  //       console.log(docRef);
  //       this.toastr.success('Category deleted successfully!', 'Success');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}

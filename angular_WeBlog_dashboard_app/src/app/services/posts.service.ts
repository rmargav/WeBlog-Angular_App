import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {} // cSpell:ignore Firestore, toastr

  uploadImage(selectedImage: any, postData: any, formStatus: any, id: any) {
    //TempCode(Not Working)
    const filePath = `postIMG/${Date.now()}`;
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Post Image Uploaded Successfully!');
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;
          console.log(postData);

          if (formStatus === 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
    });
  }

  saveData(postData: any) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Post added successfully!', 'Success');
        this.router.navigate(['posts/']);
      });
  }

  loadData() {
    return this.afs
      .collection('posts')
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

  loadOneData(id: any) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id: any, postData: any) {
    this.afs
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toastr.success('Post updated successfully!', 'Success');
        this.router.navigate(['/posts']);
      });
  }

  deleteImage(postImgPath: any, id: any) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id);
    })
  }

  deleteData(id: any) {
    this.afs.doc(`posts/${id}`).delete().then(() => {
      this.toastr.warning('Post deleted successfully!', 'warning');
  });
  }

  markFeatured(id: any, featuredData: any) {
    this.afs.doc(`posts/${id}`).update(featuredData).then(() => {
      this.toastr.info('Featured status updated!', 'Success');
    })
  }
}

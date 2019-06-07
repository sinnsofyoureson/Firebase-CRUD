/* This service is going to use an AngularFirestore instance
(public db: AngularFirestore) and will include all the code to perform all
the CRUD operations in angular. */

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getAvatars() {
    return this.db.collection('/avatar').valueChanges();
  }

  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey, value) {
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  serchUsers(searchValue) {
    return this.db.collection('user', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '/uf8ff'))
      .snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

  /* Let’s focus on adding a new User to our database. As mentioned before,
  the code to add the new user to Firebase database will be in our
  FirebaseService. So, we will need to create an angular form so the
  user can enter the data of the new record to be created. We are
  going to use Angular Reactive Forms and Angular Material input styling.
  We also added some basic forms validations to validate that the fields
  are not empty. */
  createUser(value, avatar) {
    return this.db.collection('users').add({
      name: value.name,
      // Note: “nameToSearch” value is the name of the User but in lower
      // case. This will be useful when we make the searching by name functionality.
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      // tslint:disable-next-line:radix
      age: parseInt(value.age),
      avatar: avatar
    });
  }
}

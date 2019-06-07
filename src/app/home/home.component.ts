/* Before starting with this CRUD operation it is important to clarify
that the "users" collection must be created in Firebase Console. This
can be done in two ways:
  Creating the collection with a test document from the firebase console.
  Adding a User as we did in the previous section, which will automatically
  generate the collection with the new document (user).
  Once we create some Users, we can list them and show their attributes.
  We are going to use ngOnInit function to get the data from firebase
  database when the Home page is visited.
*/

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ageValue: 0;
  searchValue: '';
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result; // Note: this.items is an array that contains all people collection.
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    });
  }

  viewDetails(item) {
    this.router.navigate(['/details/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.firebaseService.serchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    });
  }

  rangeChange(event) {
    this.firebaseService.searchUsersByAge(event.value)
    .subscribe(result => {
      this.age_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
    });
  }

  combineLists(a, b) {
    const result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id === x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }

}

import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

interface SubscriberEntry {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent implements OnInit {
  subscribersArray: SubscriberEntry[] = [];

  constructor(private subService: SubscribersService) {}

  ngOnInit(): void {
    this.subService.loadData().subscribe((val) => {
      console.log(val);
      this.subscribersArray = val;
    });
  }

  onDelete(id: any) {
    this.subService.deleteData(id);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable()
export class HomeServiceService {

  constructor() { }
  // Observable string sources
    public rawDataSource = new BehaviorSubject(null);
    public urlDataSource = new BehaviorSubject(null);
    public avgTimeDataSource = new BehaviorSubject(null);

   // Observable string streams
    rawDataStream = this.rawDataSource.asObservable();
    urlDataStream = this.urlDataSource.asObservable();
    avgTimeDataStream = this.avgTimeDataSource.asObservable();

   // Service message commands
   changeRawData(rawData) {
     console.log("change raw data",rawData);
     this.rawDataSource.next(rawData);
   }
   changeUrlData(urlData) {
    console.log("change url data",urlData);
    this.urlDataSource.next(urlData);
   }
   changeAvgTimeData(avgtimeData){
    console.log("change avg time data",avgtimeData);
    this.avgTimeDataSource.next(avgtimeData);
   }

}

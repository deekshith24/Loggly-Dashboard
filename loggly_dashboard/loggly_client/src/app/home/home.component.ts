import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HomeServiceService } from "../home-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  fromField : String;
  rawData = {};
  urlData = {};
  urls = [];
  avgTime = [];
  data = [];
  isLoading = true;
  showPerformanceMatrix = false;
  displayedColumns = [
    "API",
    'methodType',
    "muleAvgTime",
    "DBAvgTime",
    "authAvgTime",
    "APIcount",
    "More details"
  ];
  

  constructor(
    private http: HttpClient,
    private homeservice: HomeServiceService,
    private router: Router
  ) {
    // setInterval(() => {
    //   this.rawData = {};
    //   this.urlData = {};
    //   this.urls = [];
    //   this.avgTime = [];
    //   this.isLoading = true;
    //   this.data = [];
    //   this.getPerformanceMatrixData();
    // }, 10000);
  }
  ngOnInit() {
    this.homeservice.avgTimeDataStream.subscribe(
      data => {
        console.log("avg timeData in Display info:", data);
        this.avgTime = data;
        if(this.avgTime !== null){
          this.isLoading = false;
          this.showPerformanceMatrix = true;
        }
        
      },
      error => {
        console.log("error:", error);
      }
    );
   
  }
  
  getPerformanceMatrixData() {
    this.isLoading = true;
    this.showPerformanceMatrix = true;
    this.rawData = {};
    this.urlData = {};
    this.urls = [];
    this.avgTime = [];
    this.data =[];
    console.log("get data");
    this.http
      .get(`http://localhost:8081/getPerformanceMatrix?from=-${this.fromField}&to=now`)
      .subscribe(
        data => {
          this.rawData = data;
          this.homeservice.changeRawData(this.rawData);
          console.log("before calling service", data);
          this.averageTime(this.rawData);
        },
        error => {
          console.log("ERROR", error);
        }
      );
  }
  averageTime(rawData) {
    let gtxnIds = Object.keys(rawData);
    console.log("gxnIds",gtxnIds);
    gtxnIds.forEach(gtxnId => {
      if (
        !this.urlData.hasOwnProperty(
          rawData[gtxnId].Mule.URL_PATH.split("?")[0]+"^"+rawData[gtxnId].Mule.METHOD_TYPE
        )
      ) {
        //console.log("mt:",this.urlData[rawData[gtxnId].Mule);
        this.urlData[rawData[gtxnId].Mule.URL_PATH.split("?")[0]+"^"+rawData[gtxnId].Mule.METHOD_TYPE] = [gtxnId];
      } else {
        this.urlData[rawData[gtxnId].Mule.URL_PATH.split("?")[0]+"^"+rawData[gtxnId].Mule.METHOD_TYPE].push(gtxnId);
      }
    });
    console.log("urlData:", this.urlData);
    this.homeservice.changeUrlData(this.urlData);
    this.urls = Object.keys(this.urlData);

    this.urls.forEach((url) => {
      const gtxnIdsForURL = this.urlData[url];
      let muleSum = 0;
      let DBSum = 0;
      let authSum = 0;
      gtxnIdsForURL.forEach((gtxnid) => {
        muleSum += parseFloat(rawData[gtxnid].Mule.TotalTransactionTime);
        if(rawData[gtxnid].DB && rawData[gtxnid].DB.TotalTransactionTime){
          DBSum += parseFloat(rawData[gtxnid].DB.TotalTransactionTime);
        }
        
        authSum += parseFloat(rawData[gtxnid].Auth.TotalTransactionTime);
      });
      this.data.push({
        url,
        muleAvgTime: muleSum / gtxnIdsForURL.length,
        DBAvgTime: DBSum / gtxnIdsForURL.length,
        authAvgTime: authSum / gtxnIdsForURL.length,
        APIcount: gtxnIdsForURL.length
      });
    });
    this.isLoading = false;
    this.avgTime = this.data;
    this.homeservice.changeAvgTimeData(this.avgTime);
    console.log("dataSource:", this.data);
  }
  displayInfo(url) {
    this.router.navigate([`/display-info/${url}`]);
  }
}

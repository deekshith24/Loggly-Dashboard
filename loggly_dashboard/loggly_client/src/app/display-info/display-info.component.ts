import { Component, OnInit } from "@angular/core";
import { HomeServiceService } from "../home-service.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-display-info",
  templateUrl: "./display-info.component.html",
  styleUrls: ["./display-info.component.scss"]
})
export class DisplayInfoComponent implements OnInit {
  rawData;
  urlData;
  avgTimeData;
  urlIndex;

  displayedColumns = [
    "gtxnId",
    "Response_Status",
    "Response_Length",
    "TotalTransactionTimeMule",
    "TotalTransactionTimeDB",
    "TotalTransactionTimeAuth"
  ];
 
  constructor(
    private homeService: HomeServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.urlIndex = data["urlIndex"];
    });

    this.homeService.rawDataStream.subscribe(
      data => {
        console.log("rawData in Display info:", data);
        this.rawData = data;
      },
      error => {
        console.log("error:", error);
      }
    );

    this.homeService.urlDataStream.subscribe(
      data => {
        console.log("urlData in Display info:", data);
        this.urlData = data;
      },
      error => {
        console.log("error:", error);
      }
    );

    this.homeService.avgTimeDataStream.subscribe(
      data => {
        console.log("avg timeData in Display info:", data);
        this.avgTimeData = data;
      },
      error => {
        console.log("error:", error);
      }
    );
  }
 
}

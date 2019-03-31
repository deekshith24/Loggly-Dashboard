import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http) {
        this.http = http;
        this.rawData = {};
        this.urlData = {};
        this.avgTimeForAPI = {};
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent.prototype.getPerformanceMatrixData = function () {
        var _this = this;
        this.http
            .get("http://localhost:8081/getPerformanceMatrix?from=-30h&to=now")
            .subscribe(function (data) {
            _this.rawData = data;
            console.log(data);
            var gtxnIds = Object.keys(_this.rawData);
            for (var i = 0; i < gtxnIds.length; i++) {
                var gtxnId = gtxnIds[i];
                if (!_this.urlData.hasOwnProperty(_this.rawData[gtxnId].Mule.URL_PATH.split("?")[0])) {
                    _this.urlData[_this.rawData[gtxnId].Mule.URL_PATH.split("?")[0]] = [
                        gtxnId
                    ];
                }
                else {
                    _this.urlData[_this.rawData[gtxnId].Mule.URL_PATH.split("?")[0]].push(gtxnId);
                }
            }
            console.log(_this.urlData);
            var urls = Object.keys(_this.urlData);
            for (var i = 0; i < urls.length; i++) {
                var gtxnIdsForURL = _this.urlData[urls[i]];
                //this.avgTimeForAPI[urls[i]]={};
                var muleSum = 0;
                var DBSum = 0;
                var authSum = 0;
                for (var j = 0; j < gtxnIdsForURL.length; j++) {
                    muleSum += _this.urlData[gtxnIdsForURL[j]].Mule
                        .TotalTransactionTime;
                    DBSum += _this.urlData[gtxnIdsForURL[j]].DB.TotalTransactionTime;
                    authSum += _this.urlData[gtxnIdsForURL[j]].Auth
                        .TotalTransactionTime;
                }
                _this.avgTimeForAPI[urls[i]] = {
                    muleAvgTime: muleSum / gtxnIdsForURL.length,
                    DBAvgTime: DBSum / gtxnIdsForURL.length,
                    authAvgTime: authSum / gtxnIdsForURL.length
                };
            }
            console.log("avgTimeDict:", _this.avgTimeForAPI);
        }, function (error) {
            console.log("ERROR", error);
        });
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: "app-home",
            templateUrl: "./home.component.html",
            styleUrls: ["./home.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map
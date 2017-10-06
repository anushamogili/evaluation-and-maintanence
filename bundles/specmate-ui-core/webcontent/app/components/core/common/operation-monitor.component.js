"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var specmate_data_service_1 = require("../../../services/data/specmate-data.service");
var view_controller_service_1 = require("../../../services/view/view-controller.service");
var core_1 = require("@angular/core");
var OperationMonitor = (function () {
    function OperationMonitor(dataService, viewController) {
        this.dataService = dataService;
        this.viewController = viewController;
    }
    Object.defineProperty(OperationMonitor.prototype, "busy", {
        get: function () {
            return this.dataService.busy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperationMonitor.prototype, "taskName", {
        get: function () {
            return this.dataService.currentTaskName;
        },
        enumerable: true,
        configurable: true
    });
    OperationMonitor.prototype.toggleLoggingView = function () {
        this.viewController.loggingOutputShown = !this.viewController.loggingOutputShown;
    };
    OperationMonitor = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'operation-monitor',
            templateUrl: 'operation-monitor.component.html'
        }),
        __metadata("design:paramtypes", [specmate_data_service_1.SpecmateDataService, view_controller_service_1.ViewControllerService])
    ], OperationMonitor);
    return OperationMonitor;
}());
exports.OperationMonitor = OperationMonitor;
//# sourceMappingURL=operation-monitor.component.js.map
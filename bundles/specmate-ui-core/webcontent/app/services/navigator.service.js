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
var Url_1 = require("../util/Url");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var confirmation_modal_service_1 = require("../components/core/forms/confirmation-modal.service");
var specmate_data_service_1 = require("./specmate-data.service");
var NavigatorService = (function () {
    function NavigatorService(dataService, modal, router, route) {
        var _this = this;
        this.dataService = dataService;
        this.modal = modal;
        this.router = router;
        this.route = route;
        this.history = [];
        this.current = -1;
        var subscription = this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd && !_this.hasHistory) {
                if (!_this.route.snapshot.children[0] || !Url_1.Url.fromParams(_this.route.snapshot.children[0].params)) {
                    return;
                }
                var currentUrl = Url_1.Url.fromParams(_this.route.snapshot.children[0].params);
                _this.dataService.readElement(currentUrl).then(function (element) {
                    _this.current = 0;
                    _this.history[_this.current] = element;
                    subscription.unsubscribe();
                });
            }
        });
    }
    NavigatorService.prototype.navigate = function (element) {
        var _this = this;
        if (this.history[this.current] !== element) {
            this.history.splice(this.current + 1, 0, element);
            this.performNavigation(this.current + 1).then(function () {
                _this.history = _this.history.splice(0, _this.current + 1);
            }).catch(function () {
                _this.history.splice(_this.current + 1, 1);
            });
        }
    };
    NavigatorService.prototype.forward = function () {
        if (this.hasNext) {
            this.performNavigation(this.current + 1);
        }
    };
    NavigatorService.prototype.back = function () {
        if (this.hasPrevious) {
            this.performNavigation(this.current - 1);
        }
    };
    NavigatorService.prototype.performNavigation = function (index) {
        var _this = this;
        return this.router.navigate([Url_1.Url.basePath(this.history[index]), this.history[index].url]).then(function (hasNavigated) {
            if (hasNavigated) {
                _this.current = index;
                _this.dataService.clearCommits();
            }
        });
    };
    Object.defineProperty(NavigatorService.prototype, "currentElement", {
        get: function () {
            return this.history[this.current];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigatorService.prototype, "hasPrevious", {
        get: function () {
            return this.current > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigatorService.prototype, "hasNext", {
        get: function () {
            return this.current < this.history.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigatorService.prototype, "previousElement", {
        get: function () {
            if (this.hasPrevious) {
                return this.history[this.current - 1];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigatorService.prototype, "nextElement", {
        get: function () {
            if (this.hasNext) {
                return this.history[this.current + 1];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigatorService.prototype, "hasHistory", {
        get: function () {
            return this.current >= 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigatorService.prototype, "isWelcome", {
        get: function () {
            return !this.hasHistory && this.currentElement === undefined;
        },
        enumerable: true,
        configurable: true
    });
    NavigatorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [specmate_data_service_1.SpecmateDataService, confirmation_modal_service_1.ConfirmationModal, router_1.Router, router_1.ActivatedRoute])
    ], NavigatorService);
    return NavigatorService;
}());
exports.NavigatorService = NavigatorService;
//# sourceMappingURL=navigator.service.js.map
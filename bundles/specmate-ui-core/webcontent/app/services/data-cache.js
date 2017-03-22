"use strict";
var Arrays_1 = require('../util/Arrays');
var Url_1 = require("../util/Url");
var Objects_1 = require("../util/Objects");
var DataCache = (function () {
    function DataCache() {
        this.elementStore = {};
        this.contentsStore = {};
    }
    DataCache.prototype.isCachedElement = function (url) {
        return this.elementStore[url] !== undefined;
    };
    DataCache.prototype.isCachedContents = function (url) {
        return this.contentsStore[url] !== undefined;
    };
    DataCache.prototype.addElement = function (element) {
        if (this.isCachedElement(element.url)) {
            this.updateElement(element);
            return;
        }
        this.createElement(element);
    };
    DataCache.prototype.readElement = function (url) {
        return this.elementStore[url];
    };
    DataCache.prototype.readContents = function (url) {
        if (!this.contentsStore[url]) {
            this.contentsStore[url] = [];
        }
        return this.contentsStore[url];
    };
    DataCache.prototype.deleteElement = function (url) {
        // always remove from parent and then remove the element itself. Otherwise, removal from parent does not work, since this relies on the element being in the element cache.
        this.removeFromParentContents(url);
        this.elementStore[url] = undefined;
        var childrenUrls = this.getChildrenUrls(url);
        for (var i = 0; i < childrenUrls.length; i++) {
            this.removeFromParentContents(childrenUrls[i]);
            this.elementStore[childrenUrls[i]] = undefined;
        }
    };
    DataCache.prototype.updateElement = function (element) {
        Objects_1.Objects.clone(element, this.elementStore[element.url]);
    };
    DataCache.prototype.createElement = function (element) {
        this.elementStore[element.url] = element;
        this.addToParentContents(element);
        return Promise.resolve();
    };
    DataCache.prototype.getParentContents = function (url) {
        var parentUrl = Url_1.Url.parent(url);
        return this.contentsStore[parentUrl];
    };
    DataCache.prototype.getChildrenUrls = function (url) {
        var childrenUrls = [];
        for (var storedUrl in this.contentsStore) {
            if (storedUrl.startsWith(url + Url_1.Url.SEP)) {
                childrenUrls.push(storedUrl);
            }
        }
        return childrenUrls;
    };
    DataCache.prototype.addToParentContents = function (element) {
        var parentUrl = Url_1.Url.parent(element.url);
        if (!this.isCachedContents(parentUrl)) {
            this.contentsStore[parentUrl] = [];
        }
        var parentContents = this.getParentContents(element.url);
        var index = parentContents.indexOf(element);
        if (parentContents.indexOf(element) < 0) {
            parentContents.push(element);
        }
        else {
            console.error('Tried to add an existing element to parent! ' + element.url);
        }
    };
    DataCache.prototype.removeFromParentContents = function (url) {
        var parentContents = this.getParentContents(url);
        if (parentContents) {
            var element = this.elementStore[url];
            Arrays_1.Arrays.remove(parentContents, element);
        }
    };
    return DataCache;
}());
exports.DataCache = DataCache;
//# sourceMappingURL=data-cache.js.map
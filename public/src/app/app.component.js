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
var core_1 = require("@angular/core");
var app_service_js_1 = require("./app.service.js");
var AppComponent = (function () {
    function AppComponent(commentService) {
        this.commentService = commentService;
    }
    AppComponent.prototype.onsubmit = function (name, password) {
        var _this = this;
        this.commentService.getComments(name, password).subscribe(function (comments) {
            _this.comments = comments;
            if (comments.data == "Login succ!") {
                alert("终于他娘的成功了");
                window.location.href = "/src/login.html";
            }
        }, //Bind to view
        function (//Bind to view
            err) {
            // Log errors if any
            console.log(err);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'form-input',
        template: "<div class=\"box-body\" style=\"margin-top: 10%;\">\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">@</span>\n                        <input type=\"text\" [(ngModel)]=\"name\" class=\"form-control\" placeholder=\"\u7528\u6237\u540D\">\n                    </div>\n                    <br>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\">@</span>\n                        <input type=\"text\" [(ngModel)]=\"password\" class=\"form-control\" placeholder=\"\u5BC6\u7801\">\n                    </div>\n                    <br>\n\n                    <div class=\"box-body\">\n                        <button type=\"submit\" class=\"btn\" style=\"float: right;\">\u5FD8\u8BB0\u5BC6\u7801</button>\n                    </div>\n                    <div class=\"box-footer\" style=\"margin-top: 5%;\">\n                          <button type=\"button\" class=\"btn btn-primary\" (click)=\"onsubmit(name,password)\">\u767B\u5F55</button>\n\n                    </div>\n                    <!-- /input-group -->\n                </div>"
    }),
    __metadata("design:paramtypes", [app_service_js_1.CommentService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
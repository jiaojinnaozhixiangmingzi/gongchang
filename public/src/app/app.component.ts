import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Comment } from './comment'
import {CommentService} from './app.service.js';
@Component({
  selector: 'form-input',
  template: `<div class="box-body" style="margin-top: 10%;">
                    <div class="input-group">
                        <span class="input-group-addon">@</span>
                        <input type="text" [(ngModel)]="name" class="form-control" placeholder="用户名">
                    </div>
                    <br>
                    <div class="input-group">
                        <span class="input-group-addon">@</span>
                        <input type="password" [(ngModel)]="password" class="form-control" placeholder="密码">
                    </div>
                    <br>

                    <div class="box-body">
                        <button type="submit" class="btn" style="float: right;">忘记密码</button>
                    </div>
                    <div class="box-footer" style="margin-top: 5%;">
                          <button type="button" class="btn btn-primary" (click)="onsubmit(name,password)">登录</button>

                    </div>
                    <!-- /input-group -->
                </div>`
    
})
export class AppComponent  { 
    comments: "";
    constructor(private commentService: CommentService) {}
    onsubmit(name,password){
        this.commentService.getComments(name,password).subscribe(
             comments => {
             this.comments = comments;
             if (comments.data == "Login succ!") {
                alert("登录成功，跳转至主页面");
                window.location.href= "/src/showHome.html";
             }else{
                alert("登录失败，请重新输入账号和密码！");
                window.location.href= "/src/login.html";
             }
             }, //Bind to view
             err => {
             // Log errors if any
             console.log(err);
        });
    }
}

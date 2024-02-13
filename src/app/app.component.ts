import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'graphqlprac';
  rates: any[]=[];
  loading = true;
  error: any;
 
  constructor(private apollo: Apollo, private http:HttpService) {
    this.subscribeToPostAdded();
  }
  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.rates = result.data?.rates;
        this.loading = result.loading;
        this.error = result.error;
      });
   
   



  }

  subscribeToPostAdded(): void {
 this.http.subscribeToPostAdded().subscribe({
      next: (data:any) => {
        console.log('okokok');
        console.log('New Post Added:', data);
        // Handle new post added
      }
    });
  }
  

  getalldata(){
    this.http.getalldata().subscribe({
      next: (data:any) => {
        console.log(data)
      }})
    }
    postId1:any
    resdelete:any
    deletePostById(){
      let id =this.postId1
      this.http.deletePostById(id).subscribe({
        next: (data:any) => {
          console.log(data)
          // this.resdelete=data?.data?.deletePost
        }})
      }
  
  post: any;
  postId: any
  fetchPost(postId:any){

    this.http.getPostById(postId).subscribe(result => {
      this.post = result
    });

  }

  title1:any;
  content:any;
  author:any

  onSubmit(title: string, content: string,author:string) {
    let postInput ={
      title:title,
       content:content,
       author:author
    }
    // title,content,author 
    this.http.createPost(postInput).subscribe({
      next: (data:any) => {
        console.log('Post created:', data);
        // Do something with the response
      },
      error: (error:any) => {
        console.error('Error creating post:', error);
        // Handle error
      },
    });
  }
}

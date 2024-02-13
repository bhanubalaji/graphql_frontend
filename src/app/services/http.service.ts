import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private apollo: Apollo) { }

  getPostById(id: string) {
    return this.apollo.query({
      query: gql`
        query GetPost($id: ID!) {
          post(id: $id) {
            id
            title
            content
            author
          }
        }
      `,
      variables: {
        id
      }
    });
  }


  createPost(POSTINPUT:any){
    return this.apollo.mutate({
      mutation:gql`
        mutation CreatePost($input: PostInput!) {
          createPost(input: $input){
            id
            title
            content
          }
        }`,
          variables: {
            input:POSTINPUT,
          },
    })

  }

getalldata() {
  return this.apollo.query({
    query: gql`
      query GetPost {
        posts {
          id
          title
          content
          author
        }
      }
    `
  });
}


deletePostById(id: any) {
  return this.apollo.mutate({
    mutation: gql`
      mutation DeletePost($id: ID!) {
        deletePost(id: $id)
      }
    `,
    variables: {
      id
    }
  });
}


subscribeToPostAdded(): Observable<any> {
  const POST_ADDED_SUBSCRIPTION = gql`
    subscription {
      postAdded {
        id
        title
        content
        author
      }
    }
  `;

  return this.apollo.subscribe({ query: POST_ADDED_SUBSCRIPTION });
}


}




//   createPost(title:any,content:any,author:any){
//     return this.apollo.mutate({
//       mutation:gql`
//         mutation CreatePost($title: String!, $content: String! , $author: String!) {
//           createPost(title: $title, content: $content, author:$author) {
//             id
//             title
//             content
//           }
//         }`,
//           variables: {
//             title,
//             content,
//             author
//           },
//     })

//   }
// }

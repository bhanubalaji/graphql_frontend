
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, split, InMemoryCache } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = 'http://localhost:4202/graphql'; // <-- add the URL of the GraphQL server here
// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({ uri }),
//     cache: new InMemoryCache(),
//   };
// }

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink): ApolloClientOptions<any>=> {
        // Create an http link:
        const http = httpLink.create({
          uri: 'http://localhost:4202/graphql',
        });
 
        // Create a WebSocket link:
        const ws = new WebSocketLink({
          uri: 'ws://localhost:4202/graphql',
          options: {
            reconnect: true,
          },
        });
 
        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
          // split based on operation type
          // ({ query }) => {
            
          //   const { kind, operation } = getMainDefinition(query);
          //   return kind === 'OperationDefinition' && operation === 'subscription';
          // },
          ({ query }) => {
            let definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
          },
          ws,
          http,
        );
 
        return {
              link: link,
              cache: new InMemoryCache(),
            };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

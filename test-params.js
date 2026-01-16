const { GraphQLClient } = require('graphql-request');

const endpoint = 'https://salmon-cattle-403149.hostingersite.com/graphql';

const client = new GraphQLClient(endpoint);

const GET_PRODUCTS = `
  query GetProducts {
    products(first: 5) {
      nodes {
        id
        name
        slug
        ... on SimpleProduct {
          price
          productFields {
            price
            isNew
            availableSizes
          }
        }
      }
    }
  }
`;

async function test() {
    try {
        console.log('Fetching products...');
        const data = await client.request(GET_PRODUCTS);
        console.log('Success:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', JSON.stringify(error, null, 2));
    }
}

test();

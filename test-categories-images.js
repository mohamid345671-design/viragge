const { GraphQLClient } = require('graphql-request');

const endpoint = 'https://salmon-cattle-403149.hostingersite.com/graphql';
const client = new GraphQLClient(endpoint);

const TEST_IMAGES = `
  query TestImages {
    productCategories(first: 5) {
      nodes {
        name
        slug
        image {
          sourceUrl
        }
      }
    }
  }
`;

async function test() {
    try {
        console.log('Testing category images...');
        const data = await client.request(TEST_IMAGES);
        console.log('✅ Success:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(`❌ FAILED: ${error.message}`);
    }
}

test();

const { GraphQLClient } = require('graphql-request');

const endpoint = 'https://salmon-cattle-403149.hostingersite.com/graphql';
const client = new GraphQLClient(endpoint);

const TEST_CATEGORY_FIELDS = `
  query TestCategoryFields {
    productCategories(first: 5) {
      nodes {
        name
        slug
        # categoryFields {
        #   archiveGridImage
        # }
      }
    }
  }
`;

async function test() {
    try {
        console.log('Testing categoryFields...');
        const data = await client.request(TEST_CATEGORY_FIELDS);
        console.log('✅ Success:', JSON.stringify(data, null, 2));
    } catch (error) {
        if (error.response && error.response.errors) {
            console.log(`❌ FAILED: ${error.response.errors[0].message}`);
        } else {
            console.log(`❌ FAILED: ${error.message.split('\n')[0]}`);
        }
    }
}

test();

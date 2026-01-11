const { GraphQLClient } = require('graphql-request');

const endpoint = 'https://salmon-cattle-403149.hostingersite.com/graphql';
const client = new GraphQLClient(endpoint);

async function runQuery(name, query) {
    try {
        console.log(`Testing ${name}...`);
        await client.request(query);
        console.log(`✅ ${name}: SUCCESS`);
    } catch (error) {
        if (error.response && error.response.errors) {
            // Extract the specific "Cannot query field" message
            const msg = error.response.errors[0].message;
            console.log(`❌ ${name}: FAILED - ${msg}`);
        } else {
            console.log(`❌ ${name}: FAILED - ${error.message.split('\n')[0]}`);
        }
    }
}

const TEST_IS_NEW = `
  query TestIsNew {
    products(first: 1) {
      nodes {
        ... on SimpleProduct {
          productFields {
            isNew
          }
        }
      }
    }
  }
`;

const TEST_HOVER_IMAGE = `
  query TestHover {
    products(first: 1) {
      nodes {
        ... on SimpleProduct {
          productFields {
            hoverImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

const TEST_GALLERY = `
  query TestGallery {
    products(first: 1) {
      nodes {
        ... on SimpleProduct {
          productFields {
            productGallery {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`;

async function testAll() {
    await runQuery('isNew', TEST_IS_NEW);
    await runQuery('hoverImage', TEST_HOVER_IMAGE);
    await runQuery('productGallery', TEST_GALLERY);
}

testAll();

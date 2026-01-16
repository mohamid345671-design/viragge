const { GraphQLClient } = require('graphql-request');

const endpoint = 'https://salmon-cattle-403149.hostingersite.com/graphql';
const client = new GraphQLClient(endpoint);

const INTROSPECTION_QUERY = `
  query IntrospectSimpleProduct {
    __type(name: "SimpleProduct") {
      name
      fields {
        name
        type {
          name
          kind
        }
      }
    }
    
    __type(name: "ProductFields") {
      name
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
`;

async function debugSchema() {
    try {
        console.log('Inspecting Schema...');
        const data = await client.request(INTROSPECTION_QUERY);

        // Check if productFields exists on SimpleProduct
        const simpleProduct = data.__type.find(t => t && t.name === 'SimpleProduct');
        const hasProductFields = simpleProduct?.fields.find(f => f.name === 'productFields');

        console.log('SimpleProduct has productFields:', !!hasProductFields);

        if (data.__type[1]) {
            console.log('ProductFields type exists. Fields:', data.__type[1].fields.map(f => f.name));
        } else {
            console.log('ProductFields type NOT found. (Maybe it has a different name?)');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

debugSchema();

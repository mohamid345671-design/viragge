import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://salmon-cattle-403149.hostingersite.com/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
  // Note: cache: 'no-store' is handled at the route level with edge runtime
});

// GraphQL Queries - Using node wrapper for ACF images
export const GET_CATEGORIES = `
  query GetCategories {
    productCategories(first: 100) {
      nodes {
        id
        name
        slug
        count
        image {
          sourceUrl
        }
        description
        # categoryFields {
        #   categoryBannerImage
        #   archiveGridImage
        # }
      }
    }
  }
`;

export const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      nodes {
        databaseId
        id
        slug
        name
        image {
          sourceUrl
          altText
        }
        productCategories {
          nodes {
            name
          }
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
        ... on SimpleProduct {
          price
          productFields {
            price
            # isNew
            hoverImage {
              node {
                sourceUrl
                altText
              }
            }
            productGallery {
              node {
                sourceUrl
                altText
              }
            }
            galleryImage2 {
              node {
                sourceUrl
                altText
              }
            }
            galleryImage3 {
              node {
                sourceUrl
                altText
              }
            }
            availableSizes
            availableColors
          }
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS = `
  query SearchProducts($search: String!, $first: Int!) {
    products(first: $first, where: { search: $search }) {
      nodes {
        databaseId
        id
        slug
        name
        image {
          sourceUrl
          altText
        }
        productCategories {
          nodes {
            name
          }
        }
        ... on SimpleProduct {
          price
          productFields {
            price
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ... on SimpleProduct {
        id
        databaseId
        name
        slug
        price
        description
        shortDescription
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
        productCategories {
          nodes {
            name
          }
        }
        productFields {
          price
          availableColors
          # isNew (field doesn't exist in schema)
          hoverImage {
            node {
              sourceUrl
              altText
            }
          }
          productGallery {
            node {
              sourceUrl
              altText
            }
          }
          galleryImage2 {
            node {
              sourceUrl
              altText
            }
          }
          galleryImage3 {
            node {
              sourceUrl
              altText
            }
          }
          availableSizes
        }
      }
    }
  }
`;

export const CREATE_ORDER = `
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      clientMutationId
      orderId
      order {
        databaseId
        orderNumber
      }
    }
  }
`;

export const GET_SITE_SETTINGS = `
  query GetSiteSettings {
    page(id: "site-settings", idType: URI) {
      siteSettings {
        contactPhone
        contactEmail
        contactWhatsapp
        contactAddress
        socialInstagram
        socialTiktok
        socialFacebook
        socialYoutube
      }
    }
  }
`;

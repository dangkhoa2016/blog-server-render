const axios = require("axios");
var mainHost = process.env.API_URL_CONTENTFUL;

const config_contentful = {
  headers: {
    'Authorization': `Bearer ${process.env.API_TOKEN_CONTENTFUL}`,
  },
  timeout: 10000,
};

var query = `
query Get_Posts($limit: Int, $skip: Int) {
  blogPostCollection(limit: $limit, skip: $skip, where: { status: "active" }) {
    total
    skip
    limit
    items {
      publishDate
      slug
      tags
      title
      heroImage {
        url
      }
      description
      linkedFrom {
        commentCollection {
          total
        }
      }
      author {
        name
        email
      }
    }
  }
}
`;

var getBySlug = `
query Get_Post($slug: String!) {
  blogPostCollection(limit: 1, where: { slug: $slug }) {
    items {
      publishDate
      slug
      tags
      title
      body
      heroImage {
        url
      }
      description
      linkedFrom {
        commentCollection {
          total
          items {
            comment
            author {
              name
              email
            }
            sys {
              publishedAt
            }
          }
        }
      }
      author {
        name
        email
      }
    }
  }
}
`;

var parse_number = function (value) {
    value = parseInt(value);
    if (isNaN(value))
        value = 0;
    return value;
}

var default_page_size = 3;
/* Show the full list of posts */
const get_list = async (page_index, page_size) => {
    var response = { data: {} };
    try {
        page_size = parse_number(page_size);
        if (page_size > 10 || page_size < 1)
            page_size = default_page_size;
        page_index = parse_number(page_index);
        if (page_index < 1)
            page_index = 1;
        var skip = (page_index - 1) * page_size;
        response = await axios.post(
            mainHost,
            { query, variables: { 'limit': page_size, skip } },
            config_contentful
        );

        console.log("receive from contentful", response.status, response.data);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error.response.data", error.response.data);
            console.log("error.response.status", error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("error.request", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
    }

    var data = (response.data && response.data.data && response.data.data.blogPostCollection) || {};
    data.page_index = page_index;
    return data;
};

/* Show post */
const get_detail = async (slug) => {
    var response = { data: {} };
    try {
        response = await axios.post(
            mainHost,
            { query: getBySlug, variables: { slug } },
            config_contentful
        );

        console.log("receive from contentful", response.status, response.data);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error.response.data", error.response.data);
            console.log("error.response.status", error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("error.request", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
    }

    var data = (response.data && response.data.data && response.data.data.blogPostCollection) || {};
    return data.items ? data.items[0] : null;
};

module.exports = {
    get_list,
    get_detail
};

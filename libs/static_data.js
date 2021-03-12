
const state = {
    archives: [
        { month: 'October 2018', count: 6 },
        { month: 'September 2018', count: 8 },
        { month: 'August 2018', count: 16 },
        { month: 'July 2018', count: 60 },
        { month: 'June 2018', count: 30 },
    ],
    categories: [
        { name: 'Photography', count: 33 },
        { name: 'Fashion', count: 3 },
        { name: 'Technology', count: 6 },
        { name: 'Travel', count: 303 },
    ],
    tags: [
        { keyword: 'animals' },
        { keyword: 'human' },
        { keyword: 'people' },
        { keyword: 'cat' },
        { keyword: 'dog' },
        { keyword: 'nature' },
        { keyword: 'leaves' },
        { keyword: 'food' },
    ],
    contact: {
        tel: '+2 392 3929 210',
        address: '203 Fake St. Mountain View, San Francisco, California, USA',
        email: 'dev@dangkhoa2016.tk',
        website: 'https://vue-vuex-blog.dangkhoa2016.tk'
    },
    home_urls: ["/", '/home', '/home.html', '/index', '/index.html', '/default', '/default.html']
};

module.exports = state;

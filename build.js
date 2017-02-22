var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var highlighter = require('highlighter');
var templates   = require('metalsmith-templates');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var define      = require('metalsmith-define');
var pagination  = require('metalsmith-pagination');
var snippet     = require('metalsmith-snippet');

metalsmith(__dirname)
    .source('src')
    .use(define({
        blog: {
            url: 'http://jaegerpicker.github.io',
            title: 'Shawn M Campbell',
            description: 'Blog'
        },
        owner: {
            url: 'http:jaegerpicker.github.io',
            name: 'Shawn Campbell'
        },
        moment: require('moment')
    }))
    .use(collections({
        posts: {
            pattern: 'posts/**/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(pagination({
        'collections.posts': {
            perPage: 5,
            first: 'index.html',
            path: 'page/:num/index.html',
            template: 'index.jade'
        }
    }))
    .use(markdown({
        gfm: true,
        tables: true,
        highlight: highlighter()
    }))
    .use(snippet())
    .use(permalinks())
    .use(templates({
        engine: 'jade',
        directory: 'templates'
    }))
    .destination('build').build(function(err) {
    if(err) {
        throw err;
    }
});

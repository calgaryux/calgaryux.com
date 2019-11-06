'use strict';

const assemble = require('assemble')();
const config = require('./config');
const connect = require('gulp-connect');
const extname = require('gulp-extname');
const markdown = require('helper-markdown');
const date = require('helper-date');

module.exports = (src, dest, opts) => {
	opts = Object.assign({
		data: `${config.dirs.src}/data/${config.files.data}`,
		layouts: `${config.dirs.src}/templates/layouts/${config.files.templates}`,
		partials: `${config.dirs.src}/templates/partials/${config.files.templates}`
	}, opts);

	assemble.create('pages');

	assemble.data(opts.data);
	assemble.helper('markdown', markdown);
	assemble.helper('date', date);
	assemble.layouts(opts.layouts);
	assemble.pages(src);
	assemble.partials(opts.partials);

	return assemble.toStream('pages')
		.pipe(assemble.renderFile())
		.pipe(extname())
		.pipe(assemble.dest(dest))
		.pipe(connect.reload());
};

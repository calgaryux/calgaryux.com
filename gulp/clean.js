'use strict';

const del = require('del');
const gutil = require('gulp-util');

module.exports = (src, opts) => {
	opts = Object.assign({}, opts);

	return del(src, opts)
		.then(paths => {
			if (paths.length) {
				gutil.log(`Deleted files and folders:\n ${paths.join('\n')}`);
			} else {
				gutil.log(`No files to delete.`);
			}
		});
};

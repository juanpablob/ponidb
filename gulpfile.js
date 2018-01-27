/*!
 * Gulpfile
 * since 2015-07-20
 * author juanpablob <m.juanpablob@gmail.com>
 */

var	gulp = require('gulp'),
		$ = require('gulp-load-plugins')(),
		src = './src',
		dist = './dist',
		bower = './bower_components',
		npm = './node_modules',
		scripts = [
			npm + '/moonjs/dist/moon.js'
		];

// Compile styles
gulp.task('styles', function() {
	gulp.src(src + '/styles/styles.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			onError: function(error) {
				console.log(error);
			}
		}))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(dist + '/styles/'));
});

// Compile scripts
gulp.task('scripts', function () {
	gulp.src(scripts)
		.pipe($.concat('scripts.js'))
		.pipe(gulp.dest(dist + '/scripts/'));
});

// Validate scripts
gulp.task('jshint', function() {
	gulp.src(src + '/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('default'));
});

// Default
gulp.task('default', function() {
	gulp.start('styles');
	gulp.start('scripts');
	gulp.start('jshint');

	// Watchers
	gulp.watch(src + '/**/*.js', function () {
		gulp.start('scripts');
		gulp.start('jshint');
	});

	gulp.watch(src + '/styles/**/*.scss', function () {
		gulp.start('styles');
	});
});

// Build for dist
gulp.task('build', function() {
	gulp.src(src + '/styles/styles.scss')
		.pipe($.sass({
			outputStyle: 'compressed'
		}))
		.pipe($.rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(dist + '/styles/'));

	gulp.src(scripts)
		.pipe($.concat('scripts.js'))
		.pipe($.stripDebug())
		.pipe(removeLogging())
		.pipe($.jsmin())
		.pipe($.rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(dist + '/scripts/'));
});

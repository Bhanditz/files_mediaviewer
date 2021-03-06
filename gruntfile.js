const sass = require('node-sass');

module.exports = function (grunt) {
	grunt.initConfig({
		sass: {
			options: {
				implementation: sass,
				sourcemap: false
			},
			dist: {
				files: {
					'css/files_mediaviewer.css': 'src/styles/default.scss'
				}
			}
		},

		browserify: {
			dist: {
				files: {
					'js/files_mediaviewer.js': 'src/scripts/default.js',
					'js/files_mediaviewer_init.js': 'src/scripts/init.js',
				},
				options: {
					transform: [
						['babelify', {
							presets: 'es2015'
						}],
						['vueify']
					],
					alias : {
						'vue' : 'vue/dist/vue.js'
					},
					browserifyOptions: {
						debug: true
					}
				}
			},
			build: {
				files: {
					'js/files_mediaviewer.js': 'src/scripts/default.js',
					'js/files_mediaviewer_init.js': 'src/scripts/init.js',
				},
				options: {
					transform: [
						['babelify', {
							presets: 'es2015'
						}],
						['vueify']
					],
					alias : {
						'vue-router' : 'vue-router/dist/vue-router.min.js',
						'vue' : 'vue/dist/vue.min.js'
					}
				}
			}
		},

		watch: {
			default: {
				options: {
					spawn: false
				},
				files: [
					'src/**/*.js',
					'src/**/*.scss',
					'src/**/*.vue'
				],
				tasks: [
					'force:on',
					'sass',
					'browserify',
					'force:off'
				]
			}
		}
	}); //initConfig
	//
	grunt.loadNpmTasks('grunt-force');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('default', [
		'sass',
		'browserify:build'
	]);

	grunt.registerTask('watcher', [
		'sass',
		'browserify:dist',
		'watch'
	]);
};
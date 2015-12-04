module.exports = function(grunt){

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	// Concatenate Configuration
	concat: {
		options: {
			separator: ';'
		},
		script: {
			src: [
				'bower_components/foundation/js/foundation.js',
				'js/app/plugins/slider.js',
				'js/app/plugins/scroll.js',
				'js/app/plugins/menu.js',
				'js/app/main.js'
			],
			dest: 'js/concat/main.js'
		},
		index: {
			src: [
				'js/app/plugins/slider.js',
				'js/lib/jquery-ui.js',
				'js/app/plugins/menu.js',
				'js/app/index-script.js'
			],
			dest: 'js/concat/index-script.js'
		},
	},

	// Uglify Configuration
	uglify: {
		dist: {
			files: {
				'assets/templates/default/js/lib/jquery.min.js': ['js/lib/jquery.js'],
				'assets/templates/default/js/app/main.min.js': ['js/concat/main.js'],
				'assets/templates/default/js/app/index-script.min.js': ['js/concat/index-script.js'],
				'assets/templates/default/js/app/contacts-map.min.js': ['js/app/contacts-map.js'],
				'assets/templates/default/js/app/popup.min.js': ['js/app/plugins/popup.js'],
			}
		}
	},

	// Sass Configuration
	sass: {
		options: {
			loadPath: ['bower_components/foundation/scss']
		},
		dist: {
			options: {
				sourcemap: 'none',
				style: 'compressed'
			},
			files: [{
				expand: true,
				cwd: 'scss/',
				src: ['*.scss'],
				dest: 'assets/templates/default/css/',
				ext: '.css'
			}]
		}
	},

	// Watch Configuration
	watch: {
		grunt: { files: ['Gruntfile.js'], tasks: ['default'] },

		sass: {
			files: 'scss/*.scss',
			tasks: ['buildCss']
		},

		script: {
			files: 'js/**/**/*.js',
			tasks: ['buildJs']
		},

		markup: {
			files: 'dev-layout/**/*.html',
			tasks: ['htmlbuild']
		}
	},

	fixturesPath: 'dev-layout/',
	sourcesPath: 'assets/templates/default/',
 
    htmlbuild: {
        dist: {
            src: '<%= fixturesPath %>/templates/*.html',
            dest: '<%= sourcesPath %>/markup/',
            options: {
                beautify: true,
                prefix: '../',
                relative: false,
                sections: {
                    views: '<%= fixturesPath %>/views/**/*.html',
                    templates: '<%= fixturesPath %>/templates/**/*.html',
                    layout: {
                    	indexHead: '<%= fixturesPath %>/layout/index-page/index-head.html',
                    	indexSlider: '<%= fixturesPath %>/layout/index-page/index-slider.html',
                    	indexMenu: '<%= fixturesPath %>/layout/index-page/index-menu.html',
                    	indexHeader: '<%= fixturesPath %>/layout/index-page/index-header.html',
                    	indexModal: '<%= fixturesPath %>/layout/index-page/index-modal.html',
                    	commonHead: '<%= fixturesPath %>/layout/head.html',
                    	commonFooter: '<%= fixturesPath %>/layout/footer.html',
                    	commonAside: '<%= fixturesPath %>/layout/aside-panel.html',
                    	whereMain: '<%= fixturesPath %>/layout/where-page/main-content.html',
                    	textMain: '<%= fixturesPath %>/layout/text-page/text-content.html',
                    	whenMain: '<%= fixturesPath %>/layout/when-page/when-content.html',
                    	seaMain: '<%= fixturesPath %>/layout/sea-page/sea-content.html',
                    	contactsMain: '<%= fixturesPath %>/layout/contacts-page/contacts-content.html',
                    	aboutMain: '<%= fixturesPath %>/layout/about-page/about-content.html',
                    	errorOneMain: '<%= fixturesPath %>/layout/error-page/page404-content.html',
                    	errorTwoMain: '<%= fixturesPath %>/layout/error-page/page403-content.html',
                    }
                },
            }
        }
    }


});

// Load Grunt tasks
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-html-build');

// Register Grunt tasks
grunt.registerTask('buildCss', ['sass']);
grunt.registerTask('buildJs',  ['concat', 'uglify']);
grunt.registerTask('default',  ['buildCss', 'buildJs', 'watch']);

}

'use strict';

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        src: 'src',
        dist: 'dist',
        defaultConfig: 'local'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            tmp: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.src %>/app/{,*/}*.js'
            ]
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // Concat and minify files
        // Creates configurations in memory so additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.src %>/index.html'
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.src %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,txt}',
                        'assets/**/*',
                        '**/*.html'
                    ]
                }, {
                    src: 'node_modules/apache-server-configs/dist/.htaccess',
                    dest: '<%= config.dist %>/.htaccess'
                }, {
                    expand: true,
                    dot: true,
                    cwd: '.',
                    src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: '<%= config.dist %>'
                }]
            },
            defaultConfig: {
                files: [{
                    src: '<%= config.src %>/app/config/<%= config.defaultConfig %>.js',
                    dest: '<%= config.src %>/app/app.config.js',
                }]
            },
            devConfig: {
                files: [{
                    src: '<%= config.src %>/app/config/dev.js',
                    dest: '<%= config.src %>/app/app.config.js',
                }]
            },
            stageConfig: {
                files: [{
                    src: '<%= config.src %>/app/config/stage.js',
                    dest: '<%= config.src %>/app/app.config.js',
                }]
            },
            prodConfig: {
                files: [{
                    src: '<%= config.src %>/app/config/prod.js',
                    dest: '<%= config.src %>/app/app.config.js',
                }]
            }
        },

        // Performs rewrites based on the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/assets/images',
                    '<%= config.dist %>/assets/styles'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '**/*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        }
    });

    var defaultTasks = [
        'clean:dist',
        'jshint',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'usemin',
        'htmlmin',
        'clean:tmp',
        'copy:defaultConfig'
    ];

    grunt.registerTask('default', defaultTasks);
    grunt.registerTask('dev', ['copy:devConfig'].concat(defaultTasks));
    grunt.registerTask('stage', ['copy:stageConfig'].concat(defaultTasks));
    grunt.registerTask('prod', ['copy:prodConfig'].concat(defaultTasks));
};
/*frontend module:false*/
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('devmate.json'),
        path: {
            src: {
                js: 'src/js/',
                scss: 'src/scss/',
                img: 'src/img/',
                fonts: 'src/fonts/'
            },
            build: {
                js: 'static/js/',
                css: 'static/css/',
                img: 'static/img/',
                fonts: 'static/fonts/'
            }
        },
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy/mm/dd") + "\\n" %>' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <%= pkg.author.url + "\\n" %>' +
                '*/<%= "\\n" %>'
        },
        compass: {
            dev: {
                options: {
                    sassDir: '<%= path.src.scss %>',
                    imagesDir: '<%= path.build.img %>',
                    cssDir: '<%= path.build.css %>',
                    raw: 'sass_options = { :debug_info => true }\nhttp_generated_images_path = "/static/img"',
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    sassDir: '<%= path.src.scss %>',
                    imagesDir: '<%= path.src.img %>',
                    cssDir: '<%= path.build.css %>',
                    raw: 'http_generated_images_path = "/static/img"',
                    environment: 'production'
                }
            }
        },
        concat: {
            js: {
                src: [
                    '<%= path.src.js %>plugins/*.js',
                    '<%= path.src.js %>*.js'
                ],
                dest: '<%= path.build.js %>scripts.js'
            }
        },
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.src.js %>',
                        src: 'libs/*.js',
                        dest: '<%= path.build.js %>'
                    }
                ]
            },
            img: {
               files: [
                   {
                       expand: true,
                       cwd: '<%= path.src.img %>',
                       src: '**',
                       dest: '<%= path.build.img %>'
                   }
               ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.src.fonts %>',
                        src: '**',
                        dest: '<%= path.build.fonts %>'
                    }
                ]
            }
        },
        uglify: {
            js: {
                 options: {
                    banner: '<%=meta.banner%>'
                 },
                src: [
                    '<%= path.src.js %>plugins/*.js',
                    '<%= path.src.js %>*.js'
                ],
                dest: '<%= path.build.js %>scripts.js'
            }
        },
        watch: {
            js: {
                files: '<%= path.src.js %>/**/*.js',
                tasks: ['concat']
            },
            css: {
                files: '<%= path.src.scss %>/**/*.scss',
                tasks: ['compass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'copy', 'compass:dev']);
    grunt.registerTask('prod', ['uglify', 'copy', 'compass:prod']);
};
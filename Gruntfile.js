/**
 * Created by Debarshi on 5/30/2015.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'bin/**/*',
                            'icon.png',
                            'index.html',
                            'index.js',
                            'package.json',
                        ],
                        dest: 'node_modules/electron-prebuilt/dist/resources/app/'
                    }
                ],
            },
        },

    });


    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);
};

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
                            'index.js',
                            'package.json',
                        ],
                        dest: 'node_modules/electron-prebuilt/dist/resources/app/'
                    }
                ]
            },
            others: {
                files: [
                    {
                        expand: true,
                        src: [
                            'index.html',
                            'icon.png'
                        ],
                        dest: 'node_modules/electron-prebuilt/dist/resources/serve/'
                    }
                ]
            },
        },
        exec: {
            asar_package: 'cd node_modules/electron-prebuilt/dist/resources && asar pack app app.asar'
        },
        clean: ["node_modules/electron-prebuilt/dist/resources/app/"]

    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['copy', 'exec', 'clean']);
};

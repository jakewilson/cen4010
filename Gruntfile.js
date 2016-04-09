module.exports = function(grunt) {

  var gamePath = 'src/client/game/';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: [gamePath + 'TileSpriteGroup.js', gamePath + 'Entity.js', gamePath + '/*.js'],
        dest: 'src/client/meatpocalypse.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};

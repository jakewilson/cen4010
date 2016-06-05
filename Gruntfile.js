module.exports = function(grunt) {

  var paths = [
    'Entity.js',
    'Enemy.js',
    'TileSpriteGroup.js',
    'Animal.js',
    'Boss.js',
    'Carrot.js',
    'BulletPool.js',
    'RangedEnemy.js',
    'MeleeEnemy.js',
    'World.js',
    'Tofu.js',
    'Trash.js',
    'Player.js',
    'Game.js',
  ].map(function(it) {
    return 'src/client/at/game/' + it;
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: paths,
        dest: 'meatpocalypse.min.js'
      }
    },
    watch: {
      scripts: {
        files: paths,
      },
      tasks: ['uglify', 'default'],
      options: {
        debounceDelay: 1000,
      },
      uglify: {
        files: paths,
        tasks: ['uglify'],
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Grunt watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};

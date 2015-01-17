module.exports = function(grunt) {

  grunt.config.set('sass', {
    options: {
      sourceMap: true,
      style: 'compressed'
    },
    dist: {
      files: {
        'assets/linker/styles/main.css': 'assets/linker/styles/main.scss'
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
};
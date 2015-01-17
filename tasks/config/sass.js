module.exports = function(grunt) {

  grunt.config.set('sass', {

    dist: { // Target
      options: { // Target options
        style: 'expanded'
      },
      files: { // Dictionary of files
        'assets/styles/main.css': 'assets/styles/main.scss'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
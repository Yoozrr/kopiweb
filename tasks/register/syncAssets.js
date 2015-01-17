module.exports = function(grunt) {
  grunt.registerTask('syncAssets', [
    'jst:dev',
    'sass',
    'sync:dev',
    'coffee:dev'
  ]);
};
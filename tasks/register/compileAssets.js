module.exports = function(grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'jst:dev',
    'sass',
    'copy:dev',
    'coffee:dev'
  ]);
};
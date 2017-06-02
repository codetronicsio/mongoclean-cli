var assert = require('assert');
var exec = require('child_process').exec;

describe('MongoDB Clean', function() {
  describe('CLI', function() {
    it('should work without parameters', function(done) {
      var cmd = 'node index.js';
      exec(cmd, function(error, stdout, stderr) {
        done(error);
      });
    });

    it('should show help', function(done) {
      var cmd = 'node index.js -h';
      exec(cmd, function(error, stdout, stderr) {
        assert.equal(17, stderr.indexOf('mongoclean-cli'));
        done(error);
      });
    });
  });

  it('should fail for unknown parameter', function(done) {
    var cmd = 'node index.js -a';
    exec(cmd, function(error, stdout, stderr) {
      assert.equal('\u001b[31mERROR\u001b[0m: Unknown option -a\n', stderr);
      done();
    });
  });
});

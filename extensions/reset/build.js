const path = require('path');
const build = require('@harlem/build');

(async () => {
    const cwd = path.resolve('.');

    return build(cwd, 'index', {
        globalName: 'HarlemResetExtension'
    });
})();
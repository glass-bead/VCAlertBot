/* SOME AUXILIARY METHODS USED IN THE BOT COMMANDS */
const js = require('jsonfile');

// Check if file exists. If not, creates file
function createFile(file){
    const data = {
        "mode": 'empty',
        "role": '',
        "silence": []
    }
    js.writeFileSync(file, data, { spaces: 2 });
}

module.exports = {
    createFile   
};
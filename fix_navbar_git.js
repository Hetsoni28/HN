const fs = require('fs');
const execSync = require('child_process').execSync;

const original = execSync('git show 17af480:components/organisms/navbar.tsx').toString('utf8');
let current = fs.readFileSync('components/organisms/navbar.tsx', 'utf8');

const regex = /\/\*.*?Data.*?\*\/(.|\n)*?\/\*.*?Types.*?\*\//;
const matchOriginal = original.match(regex);

if (matchOriginal) {
    current = current.replace(/\/\*.*?Data.*?\*\/(.|\n)*?\/\*.*?Types.*?\*\//, matchOriginal[0]);
    fs.writeFileSync('components/organisms/navbar.tsx', current, 'utf8');
    console.log('Successfully replaced garbled emojis with clean data from git history.');
} else {
    console.log('Failed to find match in original.');
}

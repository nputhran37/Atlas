const fs = require('fs');
const html = fs.readFileSync('../landingpage.html', 'utf8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (match) {
    fs.writeFileSync('src/index.css', match[1].trim());
}

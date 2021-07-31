
const fs = require('fs');


function getjson() {
	return fs.readFileSync('./store/_data.json','utf8');
}

export let reviews = JSON.parse(getjson());


var CSVParser = require('csv-parse')
var fs = require('fs')

var fields = {}
for (var i=0; i<43; i++) {
	//fields[i] = 0
}
var processNumber = require('./processNumber')(fields)

var code = null
var cnt = 0
fs.createReadStream('./JIGYOSYO_utf8.CSV').pipe(new CSVParser()).on('data', function (data) {
	var newCode = data[7]
	if (newCode === code) {
		console.log('multiline')
	}
	if (!processNumber(data[6], data)) {
		console.log(cnt + ' -> "' + data[6] + '"')
		process.exit()
	}
	cnt ++
}).on('end', function () {
	Object.keys(fields).forEach(function (key) {
		console.log(key + ': ' + fields[key])
	})
	console.log('done')
})
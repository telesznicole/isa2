var fs = require('fs');
var read = require('./get_file_info')

const summ = (file) => {
    //read file and split numbers into array
    var nums = read(file);
    var summation = 0;

    //check to make sure all entries are numbers before summing them
    nums.forEach(element => {
        summation += (Number)(element);
    });

    //write sum back to file
    fs.appendFileSync(file, "\n" + summation.toString());

    //return array of appended file contents
    var to_return = read(file);
    return to_return;
}

module.exports = summ;
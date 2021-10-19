var fs = require('fs')

const get_file_info = (file) => {
    //throws error if file does not exist
    if (!fs.existsSync(file)) {
        throw Error("INVALID FILE: That file does not exist.")
    }

    var file_content = fs.readFileSync(file, "utf-8");
    var nums = file_content.split("\n");

    nums.forEach(element => {
        if (isNaN(element)){
            throw Error("INVALID FILE: The file contains non-numeric entries.")
        }
    });

    nums = nums.map((i) => Number(i))

    return nums;
}

module.exports = get_file_info;
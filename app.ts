const valuesToSearch: string[] = new Array();
let foundMatch: boolean = false;

if (process.argv.length <= 2) {
    console.log("Please specify words");
} else {
    for (let i = 2; i < process.argv.length; i++) {
        valuesToSearch.push(process.argv[i]);
    }
    console.log("Vlaues to search for: " + valuesToSearch);
    let lineReader = require("readline").createInterface({
        input: require("fs").createReadStream("openthesaurus.txt")
    });
    console.log("Matches: ")
    lineReader.on("line", function (line) {
        let currline: string[] = line.split(";")
        for (let i = 0; i < valuesToSearch.length; i++) {
            for (let x = 0; x < currline.length; x++) {
                let currString: string = currline[x];
                if (valuesToSearch[i] === currString || currString.indexOf(valuesToSearch[i]) != -1) {
                    console.log("\t" + currString);
                    foundMatch = true;
                }
            }
        }
    });
    lineReader.on("close", function (line) {
        if (foundMatch === false) {
            console.log("No matches found!");
        }
    });
}




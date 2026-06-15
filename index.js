const readline = require("readline-sync");

console.log("Program started");

let vpc = readline.question("VPC CIDR: ");
let subnet = readline.question("Subnet CIDR: ");
let devices = readline.question("Devices: ");

console.log("Inputs:", vpc, subnet, devices);

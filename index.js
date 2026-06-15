const readline = require("readline-sync");

function getHostCapacity(cidr) {
    return Math.pow(2, (32 - cidr)) - 2;
}

function subnetHostChecker() {

    let vpcCIDR = parseInt(readline.question("Enter VPC CIDR (/16-/30): "));
    let subnetCIDR = parseInt(readline.question("Enter Subnet CIDR (/16-/30): "));
    let devices = parseInt(readline.question("Enter number of devices: "));

    // Validation
    if (
        isNaN(vpcCIDR) ||
        isNaN(subnetCIDR) ||
        vpcCIDR < 16 ||
        vpcCIDR > 30 ||
        subnetCIDR < 16 ||
        subnetCIDR > 30
    ) {
        console.log("Invalid CIDR values.");
        return;
    }

    if (isNaN(devices) || devices <= 0) {
        console.log("Devices must be a positive integer.");
        return;
    }

    if (subnetCIDR < vpcCIDR) {
        console.log("Subnet CIDR is NOT consistent with the VPC.");
        return;
    }

    console.log("Subnet CIDR is consistent with the VPC.");

    let usableHosts = getHostCapacity(subnetCIDR);

    if (usableHosts >= devices) {
        console.log("Subnet is sufficient.");
        console.log(`Unused IP addresses: ${usableHosts - devices}`);
    } else {
        console.log("Subnet is NOT sufficient.");
        console.log(`Additional IPs needed: ${devices - usableHosts}`);
    }
}

subnetHostChecker(); 

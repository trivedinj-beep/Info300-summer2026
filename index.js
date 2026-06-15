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



function computeEnvironmentSelector() {
    console.log("\n--- Compute Environment Selector ---");

    let appName = readline.question("Application name: ");
    let users = parseInt(readline.question("Monthly users: "));
    let budget = parseFloat(readline.question("Monthly budget: "));
    let ha = readline.question("High Availability (yes/no): ").toLowerCase();

    if (isNaN(users) || users < 0) {
        console.log("Invalid user count.");
        return;
    }

    if (isNaN(budget) || budget < 0) {
        console.log("Invalid budget.");
        return;
    }

    let recommendation = "";

    // Budget rules first
    if (budget < 1000) {
        recommendation = "Single EC2";
    }
    else if (budget >= 1000 && budget <= 3000) {
        if (users < 1000 && ha === "no") {
            recommendation = "Single EC2";
        } else {
            recommendation = "EC2 + Load Balancer";
        }
    }
    else {
        if (users > 10000 || ha === "yes") {
            recommendation = "EC2 + Load Balancer + Auto Scaling";
        }
        else if (users >= 1000) {
            recommendation = "EC2 + Load Balancer";
        }
        else {
            recommendation = "Single EC2";
        }
    }

    console.log(`\nApplication: ${appName}`);
    console.log(`Recommended Environment: ${recommendation}`);
}

function main() {
    while (true) {
        console.log("\n=== MAIN MENU ===");
        console.log("1. Subnet Host Checker");
        console.log("2. Compute Environment Selector");
        console.log("3. Exit");

        let choice = readline.question("Choose an option: ");

        if (choice === "1") {
            subnetHostChecker();
        } 
        else if (choice === "2") {
            computeEnvironmentSelector();
        } 
        else if (choice === "3") {
            console.log("Goodbye!");
            break;
        } 
        else {
            console.log("Invalid option.");
        }
    }
}

main();
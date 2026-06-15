Subnet Host Checker Assignment

This is a sufficient example: 
VPC CIDR: /16
Subnet CIDR: /24
Devices: 200

Result:
Subnet CIDR is consistent with the VPC.
Subnet is sufficient.
Unused IP addresses: 54


Subnet Host Checker Example
This is a non-sufficient example: 

VPC CIDR: /16
Subnet CIDR: /29
Devices: 21

Result:
Subnet CIDR is consistent with the VPC.
Subnet is NOT sufficient.
Additional IPs needed: 15


Explanation

The program determined the result of the usable host addresses in a subnet using the 
equation 2^(32 - CIDR) - 2. Then, it compared the usable host count against
the required number of devices. If enough addresses exist, it reports the
unused IPs, otherwise it reports how many additional IPs are needed as seen in the example 
above and in the code.
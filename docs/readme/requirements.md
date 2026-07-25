# Machine and Technical Requirements

Before applying to the Astar Peers Program, confirm that you can prepare an environment capable of running an Astar archive node on an ongoing basis.

## Supported Machine Types

The program supports the following machine architectures:

| Category | Supported examples |
|---|---|
| ARM | Raspberry Pi 4, Raspberry Pi 5, and other small ARM-based machines |
| x86_64 | Desktop computers, mini PCs, servers, and other compatible x86_64 machines |

The program encourages the use of relatively modest hardware. Enterprise-class infrastructure is not required.

## Memory

- **Minimum:** 4 GB RAM
- **Recommended:** 8 GB RAM or more

Experience from Seasons 1 and 2 showed that machines with only 4 GB of physical memory—especially ARM-based machines—may have difficulty remaining stable over long periods. They are more likely to hang or shut down unexpectedly.

For this reason, 8 GB or more is strongly recommended for stable operation.

## Storage

The node must run as an **archive node**, which retains the complete blockchain state and history required by the node configuration.
Currently, **3 TB or more** of storage is required.

- Confirm the current storage needs of an Astar archive node before applying
- Prepare enough free capacity for continued chain growth
- Use storage suitable for continuous read and write activity
- Allow sufficient time and capacity for initial synchronization or resynchronization

## Internet Connection

The current program rules do not define a minimum bandwidth or data allowance. However, the node must:

- Maintain a stable connection for ongoing synchronization
- Remain reachable enough to meet the program's uptime expectation
- Connect to Polkadot Telemetry
- Support the data transfer required for initial synchronization and future resynchronization

Participants should avoid connections with restrictive data caps or frequent interruptions.

## Operating System and Linux Skills

No specific Linux distribution is mandated in the current program rules. The selected operating environment must be able to run the supported Astar node software.

Applicants must have at least basic Linux experience. You should be able to:

- Connect to and operate a Linux machine
- Run commands in a terminal
- Install and update required software
- Check processes, services, storage, and memory
- Read basic system and application logs
- Restart a stopped service or machine
- Follow node installation and troubleshooting instructions

Building an archive node is relatively straightforward, but maintaining one requires basic Linux system administration skills.

## Node Configuration Requirements

Every program node must:

- Run as an **Astar archive node**
- Connect to [Polkadot Telemetry](https://telemetry.polkadot.io/)
- Operate without major interruptions
- Aim for at least 80% uptime

For ongoing responsibilities, see [Node Operation Rules](./operations.md).

## Related Pages

- [Program Overview](./program.md)
- [How to Join](./join.md)
- [Node Operation Rules](./operations.md)
- [Rewards and Payments](./rewards.md)
- [Frequently Asked Questions](./faq.md)

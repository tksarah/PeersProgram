# Maintenance tips 

## Replace the HDD

**XFS Archive Node: Migrating Data from a 2TB HDD to a 5TB HDD (USB / Ubuntu 24.04 LTS)**

### Introduction
This document describes the procedure used to migrate data from a 2TB HDD to a larger 5TB HDD on an archive node.  
The migration was required due to increasing disk usage on the running node.

The environment uses:

- **Ubuntu 24.04 LTS**
- **XFS filesystem**
- **USB‑connected portable HDDs (2TB and 5TB)**

This guide is intended to help other operators performing similar maintenance.

---

### System Overview

| Role | Machine | Description |
|------|---------|-------------|
| Production archive node | Machine A | 2TB HDD mounted at `/var/lib/astar` |
| Migration workstation | Machine B | Used to connect both 2TB and 5TB HDDs |

---

### Data Migration Procedure

**1. Work on Machine A (Detach the device)**

Stop the running service
```bash
# sudo systemctl stop astar.service
```

Unmount the data directory
```bash
# sudo umount /var/lib/astar
```

---

**2. Work on Machine B (Migration)**

2-1. Connect disks and verify devices

Connect both the 2TB and 5TB HDDs (physical work)

Check device information
```bash
# lsblk -o NAME,SIZE,TYPE,MODEL
```

Example:
```
sdc  1.8T disk ST2000LM007-1R8174
└─sdc1 1.8T part
sdd  4.5T disk WDC WD50NDZW-11BCSS0
└─sdd1 4.5T part
```

- **sdc → 2TB HDD**
- **sdd → 5TB HDD**

---

2-2. Create a partition on the 5TB HDD

Create a GPT label
```bash
# sudo parted /dev/sdd mklabel gpt
```

⚠ Note on alignment warnings
Running:
```bash
# sudo parted -a optimal /dev/sdd mkpart primary xfs 0% 100%
```
may produce:
```
The closest location we can manage is 17.4kB to 1048kB (sectors 34..2047).
```

This indicates the partition does **not** start on a 2048‑sector (1MiB) boundary.  
Proper alignment is important for performance and should not be ignored.

✔ Correct partition creation (aligned at 1MiB)
```bash
# sudo parted -a optimal /dev/sdd mkpart primary xfs 1MiB 100%
```

---

2-3. Verify the partition

```bash
# lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT /dev/sdd
```

Example:
```
sdd     4.5T
└─sdd1  4.5T ntfs
```

---

2-4. Create an XFS filesystem

```bash
# sudo mkfs.xfs -f /dev/sdd1
```

(Output omitted)

---

2-5. Confirm XFS creation

```bash
# lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT /dev/sdd
```

```
sdd     4.5T
└─sdd1  4.5T xfs
```

---

2-6. Mount both disks

```bash
# sudo mkdir /a /b
# sudo mount /dev/sdc1 /a
# sudo mount /dev/sdd1 /b
```

Verify:
```bash
# lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT /dev/sdc /dev/sdd
```

---

2-7. Perform XFS dump & restore (core migration step)

Dump from 2TB → Restore to 5TB
```bash
# sudo xfsdump -J - /a | sudo xfsrestore -J - /b
```

This process took **approximately 15 hours** over USB 3.0.

(Output omitted)

---

2-8. Verify migrated data

```bash
# sudo ls -al /b
```

---

2-9. Optional: XFS integrity check

Unmount the restored filesystem
```bash
# sudo umount /b
```

Run a read‑only check
```bash
# sudo xfs_repair -n /dev/sdd1
```

(Output omitted)

---

2-10. Unmount and remove disks

```bash
# sudo sync
# sudo umount /a
# sudo umount /b
```

Then physically disconnect both HDDs.

---

**3. Work on Machine A (Reconnect and resume service)**

Connect the 5TB HDD (physical work)

Verify the device
```bash
# lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT /dev/sdb
```

Example:
```
sdb     4.5T
└─sdb1  4.5T xfs
```

Mount the new disk
```bash
# sudo mount /dev/sdb1 /var/lib/astar
```

Start the service
```bash
# sudo systemctl start astar.service
```

Monitor logs
```bash
# journalctl -f -u astar.service -n 100
```


# SSH Tunnel Setup

The Max PostgreSQL database is hosted on a remote server. To access it from your local machine, you need an SSH tunnel.

---

## Quick Start

Run this command before accessing the database:

```bash
ssh -f -N -L 5433:localhost:5432 root@<db-host>
```

**What this does:**
- **`-f`** - Runs in background
- **`-N`** - Don't execute remote commands (just tunnel)
- **`-L 5433:localhost:5432`** - Forward local port 5433 to remote port 5432
- **`root@<db-host>`** - Remote server

---

## How It Works

```
Your Machine                    Remote Server
┌─────────────┐                 ┌──────────────┐
│             │                 │              │
│ localhost   │  SSH Tunnel     │ PostgreSQL   │
│ :5433 ─────────────────────────> :5432       │
│             │                 │              │
└─────────────┘                 └──────────────┘
```

Your local applications connect to `localhost:5433`, and the SSH tunnel forwards the connection to the remote PostgreSQL server on port `5432`.

---

## Checking if Tunnel is Running

### On Windows (PowerShell)
```powershell
Get-Process | Where-Object {$_.ProcessName -eq "ssh"}
```

### On macOS/Linux
```bash
ps aux | grep "ssh -f -N -L 5433"
```

If you see a process with the SSH tunnel command, it's running.

---

## Stopping the Tunnel

### Find the process ID

**Windows (PowerShell):**
```powershell
Get-Process | Where-Object {$_.ProcessName -eq "ssh"} | Select-Object Id, ProcessName
```

**macOS/Linux:**
```bash
ps aux | grep "ssh -f -N -L 5433"
```

### Kill the process

**Windows (PowerShell):**
```powershell
Stop-Process -Id <process-id>
```

**macOS/Linux:**
```bash
kill <process-id>
```

---

## Restarting the Tunnel

If the tunnel dies or you need to restart it:

```bash
# 1. Stop any existing tunnel
# (See "Stopping the Tunnel" above)

# 2. Start a new tunnel
ssh -f -N -L 5433:localhost:5432 root@<db-host>
```

---

## Troubleshooting

### "Port 5433 is already in use"

**Problem:** Another process is using port 5433, or an old SSH tunnel is still running.

**Solution:**
1. Find and kill the process using port 5433
2. Restart the tunnel

**Windows (PowerShell):**
```powershell
# Find process on port 5433
Get-NetTCPConnection -LocalPort 5433 | Select-Object OwningProcess
Stop-Process -Id <process-id>
```

**macOS/Linux:**
```bash
# Find process on port 5433
lsof -i :5433
kill <process-id>
```

---

### "Connection refused" when accessing database

**Problem:** SSH tunnel is not running.

**Solution:** Start the tunnel:
```bash
ssh -f -N -L 5433:localhost:5432 root@<db-host>
```

---

### "Permission denied (publickey)"

**Problem:** SSH authentication failed. You don't have the SSH key.

**Solution:** Contact system administrator for SSH access to the remote server.

---

### Tunnel keeps dying

**Possible causes:**
1. Network connection interrupted
2. Server rebooted
3. SSH timeout

**Solution:** Restart the tunnel:
```bash
ssh -f -N -L 5433:localhost:5432 root@<db-host>
```

**To keep tunnel alive longer, use these options:**
```bash
ssh -f -N -o ServerAliveInterval=60 -o ServerAliveCountMax=3 \
  -L 5433:localhost:5432 root@<db-host>
```

---

## Alternative: Persistent Tunnel (Advanced)

If you frequently restart your machine or the tunnel keeps dying, set up a persistent tunnel.

### macOS/Linux (using `autossh`)

```bash
# Install autossh
# macOS: brew install autossh
# Linux: apt-get install autossh

# Run persistent tunnel
autossh -M 0 -f -N -o "ServerAliveInterval 60" -o "ServerAliveCountMax 3" \
  -L 5433:localhost:5432 root@<db-host>
```

### Windows (using Task Scheduler)

1. Create a batch file `start-tunnel.bat`:
```batch
@echo off
ssh -f -N -o ServerAliveInterval=60 -o ServerAliveCountMax=3 \
  -L 5433:localhost:5432 root@<db-host>
```

2. Open Task Scheduler
3. Create a new task that runs on startup
4. Point it to `start-tunnel.bat`

---

## Database Connection Details

Once the tunnel is running, connect using these credentials:

```
Host: localhost
Port: 5433  (NOT 5432!)
Database: max
User: upgradeu_ops
Password: <set via DB_PASSWORD env var>
```

**Important:** Always use port **5433** (your local tunnel port), not 5432 (the remote server port).

---

## Testing the Connection

After starting the tunnel, test the database connection:

```bash
# Using psql (if installed)
psql -h localhost -p 5433 -U upgradeu_ops -d max

# Or using Node.js
node -e "
const pg = require('pg');
const pool = new pg.Pool({
  host: 'localhost',
  port: 5433,
  database: 'max',
  user: 'upgradeu_ops',
  password: process.env.DB_PASSWORD
});
pool.query('SELECT NOW()').then(res => {
  console.log('Connected! Server time:', res.rows[0].now);
  pool.end();
}).catch(err => console.error('Connection failed:', err));
"
```

If you see "Connected!", the tunnel is working.

---

## See Also

- [database-access.md](database-access.md) - Using the database loader
- [google-drive-access.md](google-drive-access.md) - Downloading Google Drive assets

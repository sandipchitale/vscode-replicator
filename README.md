# replicator README

## Features

Wrap any configured command in a REPL.

Supports:

- `kubectl`
- `helm`
- `docker`

You can configure additional commands using config `Commands to Wrap`. YOU can use _ to REPL commands with multiword prefix e.g. echo_Prefix.

Also supports:

- `history` - show history
- `!number [args]` - run specified command from history with optional additional commands
- `!! [args]` - run previous command from history with optional additional commands

## Next idea

- Support shell independant completion

## Requirements

None.

## Extension Settings

None.

## Known Issues

None.

## Release Notes

### 0.0.3

Initial release of ...

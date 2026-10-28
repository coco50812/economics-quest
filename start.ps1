$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$runtimeNode = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) { $questNode = $nodeCommand.Source }
elseif (Test-Path -LiteralPath $runtimeNode) { $questNode = $runtimeNode }
else { throw 'Node.js 22.12+ is required. Install Node.js and rerun this script.' }
if (-not (Test-Path -LiteralPath 'node_modules/vite/bin/vite.js')) { throw 'Dependencies missing. Run npm install first, or pnpm install.' }
& $questNode 'node_modules/vite/bin/vite.js' '--host' '127.0.0.1'

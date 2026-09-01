#!/bin/sh
# Restart contract: bring up the preview on 0.0.0.0:8080 if it is down.
set -eu
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
cd /workspace
npm run dev > /tmp/shadow-biome-dev.log 2>&1 &
# Wait until the port answers so revive is not a race.
i=0
while [ "$i" -lt 40 ]; do
  if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
    exit 0
  fi
  i=$((i + 1))
  sleep 0.25
done
exit 0

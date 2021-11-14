#!/bin/bash
set -e

rm -f /var/www/welcome-chat/tmp/pids/server.pid

exec "$@"

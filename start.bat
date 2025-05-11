@echo off
REM Open terminal for the server
start "Server" cmd /k "cd /d server && npm run dev"

REM Open terminal for the client
start "Client" cmd /k "cd /d client && npm start"
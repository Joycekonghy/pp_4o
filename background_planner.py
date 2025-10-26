#!/usr/bin/env python3
import json
import time
import subprocess
from datetime import datetime

def send_notification(title, message):
    subprocess.run([
        "osascript", "-e", 
        f'display notification "{message}" with title "{title}"'
    ])

def check_tasks():
    if not os.path.exists("tasks.json"):
        return
    
    with open("tasks.json", 'r') as f:
        tasks = json.load(f)
    
    pending = [t for t in tasks if not t["completed"]]
    
    if pending:
        count = len(pending)
        send_notification("📋 Task Reminder", f"You have {count} pending task(s)")

def run_background():
    print("Background planner started. Press Ctrl+C to stop.")
    try:
        while True:
            check_tasks()
            time.sleep(3600)  # Check every hour
    except KeyboardInterrupt:
        print("\nBackground planner stopped.")

if __name__ == "__main__":
    import os
    os.chdir("/Users/joyce_kong/Desktop/web/plans")
    run_background()

#!/usr/bin/env python3
import json
import os
from datetime import datetime, timedelta
import subprocess

class Planner:
    def __init__(self):
        self.data_file = "tasks.json"
        self.tasks = self.load_tasks()
    
    def load_tasks(self):
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r') as f:
                return json.load(f)
        return []
    
    def save_tasks(self):
        with open(self.data_file, 'w') as f:
            json.dump(self.tasks, f, indent=2)
    
    def add_task(self, title, due_time=None):
        task = {
            "id": len(self.tasks) + 1,
            "title": title,
            "created": datetime.now().isoformat(),
            "due": due_time,
            "completed": False
        }
        self.tasks.append(task)
        self.save_tasks()
        print(f"Added: {title}")
    
    def complete_task(self, task_id):
        for task in self.tasks:
            if task["id"] == task_id:
                task["completed"] = True
                self.save_tasks()
                print(f"Completed: {task['title']}")
                return
        print("Task not found")
    
    def list_tasks(self):
        pending = [t for t in self.tasks if not t["completed"]]
        if not pending:
            print("No pending tasks!")
            return
        
        print("\n📋 Your Tasks:")
        for task in pending:
            due_str = f" (due: {task['due']})" if task['due'] else ""
            print(f"{task['id']}. {task['title']}{due_str}")
    
    def send_notification(self, title, message):
        subprocess.run([
            "osascript", "-e", 
            f'display notification "{message}" with title "{title}"'
        ])

def main():
    planner = Planner()
    
    while True:
        print("\n🗓️  Personal Planner")
        print("1. Add task")
        print("2. List tasks") 
        print("3. Complete task")
        print("4. Quit")
        
        choice = input("\nChoose option: ").strip()
        
        if choice == "1":
            title = input("Task title: ")
            due = input("Due time (optional, e.g. '2pm today'): ").strip()
            planner.add_task(title, due if due else None)
            
        elif choice == "2":
            planner.list_tasks()
            
        elif choice == "3":
            planner.list_tasks()
            try:
                task_id = int(input("Task ID to complete: "))
                planner.complete_task(task_id)
            except ValueError:
                print("Invalid ID")
                
        elif choice == "4":
            break
        else:
            print("Invalid option")

if __name__ == "__main__":
    main()

import os
import sys

def main():
    if len(sys.argv) < 5:
        print("Too few arguments.")
        sys.exit(1)
    
    parent_name = sys.argv[1]
    child_names = sys.argv[2:5] 

    print(f"Parent Process Name: {parent_name}")
    

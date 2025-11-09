import os
import shutil

# Function to create a file
def create_file(file_name):
    with open(file_name, 'w') as file:
        file.write("This is a sample file created by the OS simulation program.")
    print(f"File '{file_name}' created successfully.")

# Function to delete a file
def delete_file(file_name):
    try:
        os.remove(file_name)
        print(f"File '{file_name}' deleted successfully.")
    except FileNotFoundError:
        print(f"Error: File '{file_name}' does not exist.")

# Function to copy a file
def copy_file(source_file, destination_file):
    try:
        shutil.copy(source_file, destination_file)
        print(f"File '{source_file}' copied to '{destination_file}' successfully.")
    except FileNotFoundError:
        print(f"Error: Source file '{source_file}' does not exist.")

# Function to move (or rename) a file
def move_file(source_file, destination_file):
    try:
        shutil.move(source_file, destination_file)
        print(f"File '{source_file}' moved to '{destination_file}' successfully.")
    except FileNotFoundError:
        print(f"Error: Source file '{source_file}' does not exist.")

# Menu for file operations
def file_operations_menu():
    while True:
        print("\nFile Operations Menu:")
        print("1. Create a file")
        print("2. Delete a file")
        print("3. Copy a file")
        print("4. Move a file")
        print("5. Exit")

        choice = input("Enter your choice (1-5): ")

        if choice == '1':
            file_name = input("Enter the name of the file to create: ")
            create_file(file_name)
        elif choice == '2':
            file_name = input("Enter the name of the file to delete: ")
            delete_file(file_name)
        elif choice == '3':
            source_file = input("Enter the name of the source file to copy: ")
            destination_file = input("Enter the destination file name: ")
            copy_file(source_file, destination_file)
        elif choice == '4':
            source_file = input("Enter the name of the source file to move: ")
            destination_file = input("Enter the destination file name: ")
            move_file(source_file, destination_file)
        elif choice == '5':
            print("Exiting the file operations program. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

# Run the file operations menu
if __name__ == "__main__":
    file_operations_menu()

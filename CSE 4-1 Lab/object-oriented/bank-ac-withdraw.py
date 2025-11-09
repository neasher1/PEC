class Approver:
    def __init__(self, successor=None):
        self.successor = successor

    def handleRequest(self, amount):
        raise NotImplementedError("")

class Cashier(Approver):
    def handleRequest(self, amount):
        if amount < 10000:
            print(f"Cashier approved the withdrawal of Tk. {amount}")
        elif self.successor:
            print("Cashier forwards the request...")
            self.successor.handleRequest(amount)

class SeniorOfficer(Approver):
    def handleRequest(self, amount):
        if 10000 <= amount <= 1000000:
            print(f"Senior Officer and Cashier approved the withdrawal of Tk. {amount}")
        elif self.successor:
            print(" Senior Officer forwards the request...")
            self.successor.handleRequest(amount)

class Manager(Approver):
    def handleRequest(self, amount):
        if amount > 1000000:
            print(f"Manager and Senior Officer approved the withdrawal of Tk. {amount}")
        else:
            print("Amount not valid or already handled.")

if __name__ == "__main__":
    manager = Manager()
    senior_officer = SeniorOfficer(manager)
    cashier = Cashier(senior_officer)

    while True:
        try:
            user_input = input("\nEnter the amount to withdraw (or type 'exit' to quit): ")
            if user_input.lower() == 'exit':
                print("Exiting...")
                break

            amount = float(user_input)
            if amount <= 0:
                print("Please enter a positive amount.")
                continue

            print(f"\nRequesting withdrawal of Tk. {amount}")
            cashier.handleRequest(amount)

        except ValueError:
            print("Invalid input. Please enter a valid number.")

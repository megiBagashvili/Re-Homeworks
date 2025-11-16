type TransactionRecord = {
  type: string;
  amount: number;
  date: Date;
  details?: string;
};

class BankAccount {
  private accountNumber: string;
  private balance: number;
  private transactionHistory: TransactionRecord[] = [];

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.recordTransaction("Account Created", initialBalance, "Initial deposit");
  }

  public getAccountInfo(): string {
    return `Account Number: ${this.accountNumber}, Balance: ${this.balance}`;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("amount must be positive.");
    }
    this.balance += amount;
    this.recordTransaction("Deposit", amount);
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("amount must be positive.");
    }
    if (amount > this.balance) {
      throw new Error("not sufficient funds.");
    }

    this.balance -= amount;
    this.recordTransaction("Withdraw", amount);
  }

  public transferFunds(amount: number, target: BankAccount): void {
    if (amount <= 0) {
      throw new Error("amount must be positive.");
    }
    if (amount > this.balance) {
      throw new Error("Insufficient funds.");
    }

    this.balance -= amount;
    target.balance += amount;

    this.recordTransaction(
      "Transfer Sent",
      amount,
      `To Account ${target.accountNumber}`
    );

    target.recordTransaction(
      "Transfer Received",
      amount,
      `From Account ${this.accountNumber}`
    );
  }

  public getTransactionHistory(): TransactionRecord[] {
    return [...this.transactionHistory];
  }

  private recordTransaction(type: string, amount: number, details?: string): void {
    this.transactionHistory.push({
      type,
      amount,
      date: new Date(),
      details,
    });
  }
}

const account1 = new BankAccount("ACC123", 500);
const account2 = new BankAccount("ACC987", 200);

account1.deposit(150);
account1.withdraw(100);
account1.transferFunds(200, account2);

account2.deposit(50);
account2.withdraw(20);

console.log("=== Account 1 Info ===");
console.log(account1.getAccountInfo());
console.log(account1.getTransactionHistory());

console.log("=== Account 2 Info ===");
console.log(account2.getAccountInfo());
console.log(account2.getTransactionHistory());

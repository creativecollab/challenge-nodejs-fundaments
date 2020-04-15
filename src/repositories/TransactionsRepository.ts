import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => {
        return transaction.type === 'income';
      })
      .reduce((allIncome, transaction) => {
        const totalIncome = transaction.value + allIncome;
        return totalIncome;
      }, 0);

    const outcome = this.transactions
      .filter(transaction => {
        return transaction.type === 'outcome';
      })
      .reduce((allOutcome, transaction) => {
        const totalOutcome = transaction.value + allOutcome;
        return totalOutcome;
      }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

"use server";

import { prisma } from "./prisma";

type Expense = {
  amount: number;
  entity: string;
  category: string;
  created_at: Date;
};

type PartialExpense = Partial<Expense>;

export async function createExpense(expenseData: Expense) {
  try {
    const expense = await prisma.expenses.create({
      data: {
        amount: expenseData.amount,
        entity: expenseData.entity,
        category: expenseData.category,
        created_at: expenseData.created_at,
      },
    });

    return { success: true, data: expense };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function fetchExpenses() {
  try {
    const allTransactions = await prisma.expenses.findMany();
    return { success: true, data: allTransactions };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function deleteExpense(id: bigint) {
  try {
    await prisma.expenses.delete({
      where: {
        id,
      },
    });

    return { success: true, message: "Successfully deleted expense." };
  } catch (err) {
    return { success: false, message: `Failed to delete expense: ${err}` };
  }
}

export async function updateExpense(
  newExpenseData: PartialExpense,
  id: bigint
) {
  try {
    await prisma.expenses.update({
      where: { id: id },
      data: { ...newExpenseData },
    });

    return { success: true, message: "Expense updated successfully." };
  } catch (err) {
    return { success: false, message: `Failed to update expense: ${err}` };
  }
}

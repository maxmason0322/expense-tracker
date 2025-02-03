"use client";

import styled, { keyframes } from "styled-components";
import colors from "@/app/styles/colors";
import textStyles from "../styles/text";
import TrashSVG from "@/app/images/trash.svg?inline";
import EditSVG from "@/app/images/edit.svg?inline";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import {
  createExpense,
  fetchExpenses,
  deleteExpense,
  updateExpense,
} from "@/lib/actions";

interface Transaction {
  id: bigint;
  entity: string;
  amount: number;
  category: string | null;
  created_at: Date;
}

export default function Transactions() {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const result = await fetchExpenses();

      if (result.success && result.data) {
        setTransactions(result.data);
      } else {
        setError("Failed to fetch transactions");
      }
    } catch (err) {
      setError("An error occurred while fetching transactions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const rawData = new FormData(e.currentTarget);

      const formData = {
        amount: Number(rawData.get("amount")),
        entity: rawData.get("entity") as string,
        category: rawData.get("category") as string,
        created_at: new Date(rawData.get("date") as string),
      };

      if (editingTransaction) {
        const result = await updateExpense(formData, editingTransaction.id);
        if (result.success) {
          setOpen(false);
          setEditingTransaction(null);
          loadTransactions();
        } else {
          setError("Failed to update expense");
        }
      } else {
        const result = await createExpense(formData);
        if (result.success) {
          setOpen(false);
          loadTransactions();
        } else {
          setError("Failed to create expense");
        }
      }
    } catch (err) {
      setError(`Failed to ${editingTransaction ? "update" : "create"} expense`);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setOpen(true);
  };

  const adjustPrintedTime = (date: Date) => {
    const [month, day, year] = [
      date.getMonth(),
      date.getUTCDate(),
      date.getFullYear(),
    ];
    const adjustedDate = new Date(year, month, day);
    return adjustedDate.toDateString();
  };

  const deleteTransaction = async (id: bigint) => {
    try {
      const result = await deleteExpense(id);
      if (result.success) {
        loadTransactions();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while deleting the expense");
    }
  };

  if (isLoading) {
    return <Wrapper>Loading transactions...</Wrapper>;
  }

  if (error) {
    return <Wrapper>{error}</Wrapper>;
  }

  return (
    <Wrapper>
      <Inner>
        <Title>Transactions</Title>
        <TransactionTable>
          {transactions.map((t) => (
            <Row key={t.id}>
              <Entity>{t.entity}</Entity>
              <Amount>${t.amount.toFixed(2)}</Amount>
              <Category>{t.category}</Category>
              <div>{adjustPrintedTime(t.created_at)}</div>
              <Trash onClick={() => deleteTransaction(t.id)} />
              <Edit onClick={() => handleEdit(t)} />
            </Row>
          ))}
        </TransactionTable>
        <Dialog.Root
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) setEditingTransaction(null);
          }}
        >
          <Dialog.Trigger asChild>
            <PrimaryButton>new transaction</PrimaryButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Overlay />
            <Content>
              <DialogTitle>
                {editingTransaction ? "Edit Transaction" : "New Transaction"}
              </DialogTitle>
              <Description>
                {editingTransaction
                  ? "Update the transaction details."
                  : "Enter the details for a new transaction."}
              </Description>
              <form onSubmit={handleSubmit}>
                <Fieldset>
                  <Label htmlFor="entity">Entity</Label>
                  <Input
                    id="entity"
                    name="entity"
                    required
                    defaultValue={editingTransaction?.entity}
                  />
                </Fieldset>
                <Fieldset>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    required
                    defaultValue={editingTransaction?.amount}
                  />
                </Fieldset>
                <Fieldset>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={editingTransaction?.category || ""}
                  />
                </Fieldset>
                <Fieldset>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    name="date"
                    required
                    defaultValue={
                      editingTransaction
                        ? new Date(editingTransaction.created_at)
                            .toISOString()
                            .split("T")[0]
                        : undefined
                    }
                  />
                </Fieldset>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <SecondaryButton
                    type="submit"
                    bgColor={colors.js.amberGlow}
                    bgColorHover={colors.js.burntAmber}
                  >
                    {editingTransaction ? "update" : "save"}
                  </SecondaryButton>
                  <Dialog.Close asChild>
                    <SecondaryButton
                      bgColor={colors.js.rustyRose}
                      bgColorHover={colors.js.deepRust}
                    >
                      cancel
                    </SecondaryButton>
                  </Dialog.Close>
                </div>
              </form>
            </Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Inner>
    </Wrapper>
  );
}

const overlayShow = keyframes`
  from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const contentShow = keyframes`
  from {
		opacity: 0;
		transform: translate(-50%, -48%) scale(0.96);
	}
	to {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
`;

const contentHide = keyframes`
  from {
    opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
	to {
    opacity: 0;
		transform: translate(-50%, -48%) scale(0.96);
	}
`;

const Wrapper = styled.section`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: ${colors.js.charredUmber};
  padding: 0 200px;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  ${textStyles.h1};
`;

const TransactionTable = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid white;
  border-right: 1px solid white;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr) repeat(2, 2fr) repeat(2, 30px);
  border-top: 1px solid ${colors.js.parchmentWhite};
  padding: 4px;
  color: ${colors.js.parchmentWhite};
  ${textStyles.bodyL};
  align-items: center;

  &:last-of-type {
    border-bottom: 1px solid ${colors.js.parchmentWhite};
  }
`;

const Entity = styled.div``;

const Amount = styled.div``;

const Category = styled.div``;

const Edit = styled(EditSVG)`
  width: 20px;
  height: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const Trash = styled(TrashSVG)`
  width: 20px;
  height: 20px;

  path {
    fill: ${colors.js.rustyRose};
  }

  &:hover {
    cursor: pointer;
  }
`;

const Overlay = styled(Dialog.Overlay)`
  background-color: ${colors.js.charredUmber}99;
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 0.25s ease;
  z-index: 100;
`;

const Content = styled(Dialog.Content)`
  background-color: ${colors.js.ivoryMist};
  border-radius: 16px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 0.25s ease;
  z-index: 100;

  &:focus {
    border: none;
    outline: none;
  }

  [data-state="closed"] {
    animation: ${contentHide} 0.25s ease;
  }
`;

const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  font-size: 17px;
  color: ${colors.js.charredUmber};
  ${textStyles.bodyL};
`;

const Description = styled(Dialog.Description)`
  margin: 10px 0 20px;
  font-size: 15px;
  line-height: 1.5;
  color: ${colors.js.charcoalSlate};
  ${textStyles.bodyS};
`;

const Fieldset = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
  border: none;
`;

const Label = styled.label`
  ${textStyles.bodyM};
  color: ${colors.js.charredUmber};
  font-weight: 600;
  width: 75px;
`;

const Input = styled.input`
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  height: 35px;
  background-color: transparent;
  caret-color: ${colors.js.charredUmber};
  border: none;
  outline: none;
  color: ${colors.js.charredUmber};
  ${textStyles.bodyM};

  &:focus {
    border: none;
    outline: none;
  }
`;

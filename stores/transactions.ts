// stores/transactions.ts

// 1. Impor 'ref' dan 'computed' dari 'vue'
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { db, type Transaction } from '../utils/db'; // Path sudah benar, asumsikan 'utils' sejajar 'stores'
import { liveQuery } from 'dexie';

export const useTransactionStore = defineStore('transactions', () => {
  const allTransactions = ref<Transaction[]>([]);
  
  // liveQuery akan secara otomatis mengupdate `allTransactions.value` saat data di database berubah
  liveQuery(() => db.transactions.orderBy('tanggal').reverse().toArray()).subscribe(
    (data) => (allTransactions.value = data)
  );

  const totalPemasukan = computed(() => 
    allTransactions.value
      .filter(t => t.tipe === 'pemasukan')
      .reduce((sum, t) => sum + t.jumlah, 0)
  );

  const totalPengeluaran = computed(() =>
    allTransactions.value
      .filter(t => t.tipe === 'pengeluaran')
      .reduce((sum, t) => sum + t.jumlah, 0)
  );

  const saldoAkhir = computed(() => totalPemasukan.value - totalPengeluaran.value);

  async function addTransaction(tx: Omit<Transaction, 'id'>) {
    // Kita hapus 'tanggal' dari Omit karena akan kita buat di sini
    await db.transactions.add({
      ...tx,
      tanggal: new Date(),
    });
  }
  
  // Fungsi untuk menghapus transaksi
  async function deleteTransaction(id: number) {
    await db.transactions.delete(id);
  }

  return { 
    allTransactions, 
    totalPemasukan, 
    totalPengeluaran, 
    saldoAkhir, 
    addTransaction,
    deleteTransaction // Jangan lupa return fungsi baru
  };
});

<template>
  <div class="history-container">
    <h2>Riwayat Transaksi</h2>
    
    <div v-if="store.allTransactions.length === 0" class="empty-state">
      <Archive :size="48" color="#999" />
      <p>Belum ada transaksi.</p>
      <NuxtLink to="/tambah" class="add-first-button">Tambah Transaksi Pertama</NuxtLink>
    </div>

    <ul v-else class="transaction-list">
      <li v-for="tx in store.allTransactions" :key="tx.id" class="transaction-item">
        <div class="icon" :class="tx.tipe">
          <ArrowDown v-if="tx.tipe === 'pemasukan'" :size="24" />
          <ArrowUp v-else :size="24" />
        </div>
        <div class="details">
          <span class="deskripsi">{{ tx.deskripsi }}</span>
          <span class="kategori">{{ tx.kategori }} - {{ new Date(tx.tanggal).toLocaleDateString('id-ID') }}</span>
        </div>
        <div class="amount" :class="tx.tipe">
          {{ formatCurrency(tx.jumlah) }}
        </div>
        <button @click="hapus(tx.id)" class="delete-button">
            <Trash2 :size="18" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTransactionStore } from '~/stores/transactions';
import { useCurrency } from '~/composables/useCurrency';
import { ArrowUp, ArrowDown, Archive, Trash2 } from 'lucide-vue-next';

const store = useTransactionStore();
const { formatCurrency } = useCurrency();

function hapus(id) {
  // Untuk aplikasi nyata, tambahkan dialog konfirmasi di sini
  // misalnya: if (confirm('Anda yakin ingin menghapus transaksi ini?')) { ... }
  store.deleteTransaction(id);
}
</script>

<style scoped>
.history-container h2 {
  margin-bottom: 1.5rem;
}
.empty-state {
  text-align: center;
  margin-top: 4rem;
  color: #777;
}
.add-first-button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
}
.transaction-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.transaction-item {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
}
.icon.pemasukan { background-color: #28a745; }
.icon.pengeluaran { background-color: #dc3545; }
.details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.deskripsi {
  font-weight: 500;
}
.kategori {
  font-size: 0.8rem;
  color: #777;
}
.amount {
  font-weight: bold;
}
.amount.pemasukan { color: #28a745; }
.amount.pengeluaran { color: #dc3545; }
.delete-button {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 0.5rem;
    margin-left: 0.5rem;
}
.delete-button:hover {
    color: #dc3545;
}
</style>

<template>
  <div class="dashboard">
    <div class="summary-card">
      <p>Saldo Akhir</p>
      <h2>{{ formatCurrency(store.saldoAkhir) }}</h2>
      <div class="details">
        <div>
          <span>Pemasukan</span>
          <p class="pemasukan">+ {{ formatCurrency(store.totalPemasukan) }}</p>
        </div>
        <div>
          <span>Pengeluaran</span>
          <p class="pengeluaran">- {{ formatCurrency(store.totalPengeluaran) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTransactionStore } from '~/stores/transactions';
import { useCurrency } from '~/composables/useCurrency';

const store = useTransactionStore();
const { formatCurrency } = useCurrency(); // Panggil fungsi yang kita buat
</script>

<style scoped>
.summary-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  text-align: center;
}
.summary-card h2 {
  margin: 0.5rem 0;
  font-size: 2.5rem;
  color: var(--text-color);
}
.details {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--bg-color);
}
.details p {
  margin: 0.25rem 0 0 0;
  font-weight: bold;
  font-size: 1.1rem;
}
.pemasukan { color: #28a745; }
.pengeluaran { color: #dc3545; }
</style>
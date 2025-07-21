<template>
  <div>
    <h2>Laporan Pengeluaran</h2>
    <div v-if="pengeluaranPerKategori.length === 0" class="empty-state">
      <p>Belum ada data pengeluaran untuk ditampilkan.</p>
    </div>
    <div v-else class="report-container">
      <div v-for="item in pengeluaranPerKategori" :key="item.kategori" class="category-card">
        <div class="category-info">
          <span class="category-name">{{ item.kategori }}</span>
          <span class="category-total">{{ formatCurrency(item.total) }}</span>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: (item.total / totalSemuaPengeluaran * 100) + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTransactionStore } from '~/stores/transactions';
import { useCurrency } from '~/composables/useCurrency';

const store = useTransactionStore();
const { formatCurrency } = useCurrency();

const pengeluaranPerKategori = computed(() => {
  const pengeluaran = store.allTransactions.filter(tx => tx.tipe === 'pengeluaran');
  const grouped = pengeluaran.reduce((acc, tx) => {
    if (!acc[tx.kategori]) {
      acc[tx.kategori] = 0;
    }
    acc[tx.kategori] += tx.jumlah;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([kategori, total]) => ({ kategori, total }))
    .sort((a, b) => b.total - a.total); // Urutkan dari terbesar
});

const totalSemuaPengeluaran = computed(() => store.totalPengeluaran);
</script>

<style scoped>
.report-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.category-card {
  background-color: white;
  padding: 1rem;
  border-radius: 12px;
}
.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}
.category-name {
  font-weight: 500;
}
.category-total {
  font-weight: bold;
  color: var(--primary-color);
}
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}
.progress {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 4px;
}
.empty-state {
  text-align: center;
  margin-top: 4rem;
  color: #777;
}
</style>

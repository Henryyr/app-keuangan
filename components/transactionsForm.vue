<template>
  <form @submit.prevent="handleSubmit">
    <h3>Tambah Transaksi Baru</h3>
    <input v-model="deskripsi" type="text" placeholder="Deskripsi (e.g. Beli Kopi)" required>
    <input v-model.number="jumlah" type="number" placeholder="Jumlah" required>
    <select v-model="tipe">
      <option value="pengeluaran">Pengeluaran</option>
      <option value="pemasukan">Pemasukan</option>
    </select>
    <button type="submit">Tambah</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['submit']);

const deskripsi = ref('');
const jumlah = ref(0);
const tipe = ref<'pengeluaran' | 'pemasukan'>('pengeluaran');

const handleSubmit = () => {
  if (deskripsi.value && jumlah.value > 0) {
    emit('submit', {
      deskripsi: deskripsi.value,
      jumlah: jumlah.value,
      tipe: tipe.value
    });

    // Reset form
    deskripsi.value = '';
    jumlah.value = 0;
  }
};
</script>

<style scoped>
/* Style khusus untuk form */
form { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
input, select, button { padding: 10px; font-size: 1rem; }
button { background-color: #4DBA87; color: white; border: none; cursor: pointer; }
</style>
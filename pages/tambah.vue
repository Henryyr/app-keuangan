<template>
  <div class="form-container">
    <h2>Tambah Transaksi Baru</h2>
    <form @submit.prevent="simpan">
      <div class="form-group">
        <label for="deskripsi">Deskripsi</label>
        <input id="deskripsi" v-model="deskripsi" placeholder="e.g. Makan Siang di Warung Murah" required />
      </div>

      <div class="form-group">
        <label for="jumlah">Jumlah (Rp)</label>
        <input id="jumlah" v-model.number="jumlah" type="number" placeholder="50000" required />
      </div>

      <div class="form-group">
        <label for="tipe">Tipe Transaksi</label>
        <select id="tipe" v-model="tipe">
          <option value="pengeluaran">Pengeluaran</option>
          <option value="pemasukan">Pemasukan</option>
        </select>
      </div>

      <div class="form-group">
        <label for="kategori">Kategori</label>
        <input id="kategori" v-model="kategori" placeholder="e.g. Makanan, Transportasi" required />
      </div>
      
      <button type="submit" class="submit-button">
        <Save :size="20" />
        <span>Simpan Transaksi</span>
      </button>
    </form>

    <div v-if="pesanSukses" class="success-message">
      {{ pesanSukses }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // <-- PENTING: Impor ref
import { useRouter } from 'vue-router'; // <-- PENTING: Impor useRouter
import { useTransactionStore } from '~/stores/transactions';
import { Save } from 'lucide-vue-next';

const store = useTransactionStore();
const router = useRouter();

const deskripsi = ref('');
const jumlah = ref(null);
const tipe = ref('pengeluaran');
const kategori = ref('');
const pesanSukses = ref('');

async function simpan() {
  if (!deskripsi.value || !jumlah.value || !kategori.value) {
    return; // Validasi sederhana
  }

  await store.addTransaction({
    deskripsi: deskripsi.value,
    jumlah: jumlah.value,
    tipe: tipe.value,
    kategori: kategori.value,
  });

  // Ganti alert() dengan pesan di layar
  pesanSukses.value = 'Transaksi berhasil disimpan!';
  
  // Reset form
  deskripsi.value = '';
  jumlah.value = null;
  tipe.value = 'pengeluaran';
  kategori.value = '';

  // Tunggu sebentar lalu kembali ke halaman utama
  setTimeout(() => {
    pesanSukses.value = '';
    router.push('/histori');
  }, 1500);
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}
input, select {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}
.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}
.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  text-align: center;
}
</style>

<!-- /app.vue -->
<template>
  <div class="app-container">
    <header class="app-header">
      <h1>UangKu</h1>
    </header>

    <main class="app-main">
      <NuxtPage />
    </main>

    <!-- Menu Navigasi di bagian bawah -->
    <nav class="bottom-nav">
      <NuxtLink to="/" class="nav-item">
        <LayoutDashboard :size="24" />
        <span>Dashboard</span>
      </NuxtLink>
      <NuxtLink to="/histori" class="nav-item">
        <History :size="24" />
        <span>Histori</span>
      </NuxtLink>
      <NuxtLink to="/tambah" class="nav-item add-button">
        <PlusCircle :size="40" />
      </NuxtLink>
      <NuxtLink to="/laporan" class="nav-item">
        <BarChart2 :size="24" />
        <span>Laporan</span>
      </NuxtLink>
      <NuxtLink to="/pengaturan" class="nav-item">
        <Settings :size="24" />
        <span>Setelan</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import { LayoutDashboard, PlusCircle, History, BarChart2, Settings } from 'lucide-vue-next';
</script>

<style>
/* (CSS dari respons sebelumnya tetap sama, tidak perlu diubah) */
:root {
  --primary-color: #00DC82;
  --bg-color: #f0f2f5;
  --text-color: #333;
  --nav-bg: #ffffff;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  padding-bottom: 80px;
}
.app-header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 10;
}
.app-main {
  padding: 1rem;
}
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: var(--nav-bg);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ddd;
  z-index: 1000;
  padding: 0 1rem;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;
  text-decoration: none;
  font-size: 0.75rem;
  gap: 4px;
}
.nav-item.router-link-exact-active {
  color: var(--primary-color);
}
.add-button {
  color: var(--primary-color);
  transform: translateY(-20px);
  background-color: white;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
}
</style>

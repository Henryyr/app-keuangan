// utils/db.ts
import Dexie, { type Table } from 'dexie';

export interface Transaction {
  id?: number;
  deskripsi: string;
  jumlah: number;
  tipe: 'pemasukan' | 'pengeluaran';
  tanggal: Date;
}

export class MySubClassedDexie extends Dexie {
  transactions!: Table<Transaction>;

  constructor() {
    super('databaseKeuangan');
    this.version(1).stores({
      // '++id' artinya auto-incrementing primary key
      transactions: '++id, deskripsi, jumlah, tipe, tanggal',
    });
  }
}

export const db = new MySubClassedDexie();
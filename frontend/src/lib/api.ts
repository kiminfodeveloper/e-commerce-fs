const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function getStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMonthlySales() {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/vendas-mensais`);
    if (!res.ok) throw new Error('Failed to fetch sales data');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProdutos(search?: string) {
  try {
    const url = search 
      ? `${API_BASE_URL}/produtos?search=${encodeURIComponent(search)}`
      : `${API_BASE_URL}/produtos`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

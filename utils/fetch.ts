export const getFetch = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'get',
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('error');

  return response.json();
};

export const fetchWithoutGet = async <T, R>(
  url: string,
  type: 'post' | 'put' | 'delete',
  data?: T,
): Promise<R> => {
  const response = await fetch(url, {
    method: type,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('error');

  return response.json();
};

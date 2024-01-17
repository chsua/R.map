export interface FetchError {
  status: string;
  message: any;
}

export const getFetch = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'get',
    cache: 'no-store',
  });

  // 자꾸 런타임 오류가 나서 일단 각주처리
  // if (!response.ok) {
  //   throw new Error(
  //     JSON.stringify({ status: response.status, message: response.text() }),
  //   );
  // }

  return response.json();
};

export const fetchWithoutGet = async <T, R>(
  url: string,
  type: 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  data?: T,
): Promise<R> => {
  const response = await fetch(url, {
    method: type,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  // if (!response.ok)
  //   throw new Error(
  //     JSON.stringify({ status: response.status, message: response.text() }),
  //   );

  return response.status === 201 ? response.json() : response;
};

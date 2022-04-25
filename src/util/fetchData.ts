export const fetchData = function <G>(url: string): Promise<G> {
  return new Promise<G>((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          reject(res);
        }
        resolve(res.json());
      })
      .catch(reject);
  });
};

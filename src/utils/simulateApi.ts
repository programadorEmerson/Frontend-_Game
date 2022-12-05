const simulateRequest = <T>(response: T) => (callback: (props: T) => void) => {
  setTimeout(() => {
    callback(response);
  }, 1000);
};

export const fakeRequest = async <T>(response: T): Promise<T> =>
  new Promise((resolve) => {
    simulateRequest(response)(resolve);
  });

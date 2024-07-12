export async function* makeIterableFromReader(
  readable: ReadableStreamDefaultReader,
) {
  try {
    while (true) {
      const { done, value } = await readable.read();
      if (done) break;
      yield value;
    }
  } finally {
    readable.releaseLock();
  }
}

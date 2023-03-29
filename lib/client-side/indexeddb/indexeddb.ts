import { decrypt, encrypt } from "../../isomorphic/encryption/encryption"

export async function store(
  dbName: string,
  storeName: string,
  data: unknown,
  secretKey: ArrayBuffer
): Promise<void> {
  const encryptedData = await encrypt(JSON.stringify(data), secretKey)

  const request = indexedDB.open(dbName)
  request.onupgradeneeded = (event) => {
    const db = event.target.result as IDBDatabase
    db.createObjectStore(storeName)
  }

  request.onsuccess = (event) => {
    const db = event.target.result as IDBDatabase
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)
    store.put(encryptedData, "data")
  }
}

export async function retrieve(
  dbName: string,
  storeName: string,
  secretKey: ArrayBuffer
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName)
    request.onsuccess = async (event) => {
      const db = event.target.result as IDBDatabase
      const transaction = db.transaction(storeName, "readonly")
      const store = transaction.objectStore(storeName)
      const getData = store.get("data")

      getData.onsuccess = async (event) => {
        if (event.target.result) {
          const decryptedData = await decrypt(event.target.result, secretKey)
          resolve(JSON.parse(decryptedData))
        } else {
          resolve(null)
        }
      }

      getData.onerror = (event) => {
        reject(event.target.error)
      }
    }

    request.onerror = (event) => {
      reject(event.target.error)
    }
  })
}

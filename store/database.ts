import { openDatabase } from "expo-sqlite/legacy";
import { Platform } from 'react-native';

export interface DatabaseInterface {
  executeQuery: (query: string, params?: any[]) => Promise<any>;
}

class WebDatabase implements DatabaseInterface {
  private db: IDBDatabase | null = null;
  private dbName = 'financeApp';
  private version = 1;
  private tables = ['User', 'Transaction', 'Categories', 'MonthlyReports', 'Budgets'];

  constructor() {
    this.initDatabase();
  }

  private async reloadDatabase(): Promise<IDBDatabase> {
    return await new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  private initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Créer les tables si elles n'existent pas
        this.tables.forEach(table => {
          if (!db.objectStoreNames.contains(table)) {
            db.createObjectStore(table, { keyPath: 'id', autoIncrement: true });
          }
        });
      };
    });
  }

  async executeQuery(query: string, params: any[] = []): Promise<any> {
    // Simulation simple des requêtes SQL pour IndexedDB
    // Note: Ceci est une implémentation basique, à adapter selon vos besoins
    const [action, ...rest] = query.toLowerCase().split(' ');
    
    switch(action) {
      case 'select':
        return await this.handleSelect(query, params);
      case 'insert':
        return await this.handleInsert(query, params);
      // Ajouter d'autres cas selon vos besoins
      default:
        throw new Error(`Action non supportée: ${action}`);
    }
  }

  private async handleSelect(query: string, params: any[]): Promise<any> {
    if (query.includes('count(*)')) {
      const table = this.checkTable(query);
      return new Promise( async(resolve, reject) => {
        if (!this.db) {
          this.db = await this.reloadDatabase();        
        }
        const transaction = this.db.transaction([table], 'readonly');
        const store = transaction.objectStore(table);
        const countRequest = store.count();
        
        countRequest.onsuccess = () => {
          resolve({ count: countRequest.result });
        };
        
        countRequest.onerror = () => reject(countRequest.error);
      });
    } else {
      const table = this.checkTable(query);
      return new Promise( async(resolve, reject) => {
        if (!this.db) {
          this.db = await this.reloadDatabase();        
        }
        const transaction = this.db.transaction([table], 'readonly');
        const store = transaction.objectStore(table);
        const request = store.getAll();

        request.onsuccess = () => {
          resolve({ data: request.result });
        };
        
        request.onerror = () => reject(request.error);
      });
    }
    // Ajouter d'autres types de requêtes SELECT selon vos besoins
    return null;
  }

  private async handleInsert(query: string, params: any[]): Promise<any> {
    // Implémenter la logique d'insertion
    // À adapter selon vos besoins
    const table = this.checkTable(query);
    return new Promise(async (resolve, reject) => {
      // console.log('Old db connexion', this.db); 
      if (!this.db) {
        this.db = await this.reloadDatabase();
        console.log('New db connexion', this.db);
      }
      
      const transaction = this.db.transaction([table], 'readwrite');
      const store = transaction.objectStore(table);
      
      const addRequest = store.add([...params]);      
      addRequest.onsuccess = () => {
        resolve({ success: true });
      };      
      addRequest.onerror = () => reject(addRequest.error);
    });
  }

  private checkTable(query: string): string{
    let table: string = '';
    this.tables.forEach(t => {
      if (query.toLowerCase().includes(t.toLowerCase())) {
        table = t;
      }
    });
    return table;
  }
}

class MobileDatabase implements DatabaseInterface {
  private db: any;

  constructor() {
    this.db = openDatabase('financeApp.db');
  }

  async executeQuery(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: { executeSql: Function }) => {
        tx.executeSql(query, params,
          (_: unknown, resultSet: { rows: { _array: any[] } }) => resolve(resultSet.rows._array),
          (_: unknown, error: Error) => reject(error)
        );
      });
    });
  }
}

// Singleton pour la base de données
let databaseInstance: DatabaseInterface | null = null;

export const connectToDatabase = async (): Promise<DatabaseInterface> => {
  if (!databaseInstance) {
    databaseInstance = Platform.OS === 'web' ? new WebDatabase() : new MobileDatabase();
  }
  return databaseInstance;
};

export const isUserTableEmpty = async (): Promise<boolean> => {
  const db = await connectToDatabase();
  const result = await db.executeQuery('SELECT COUNT(*) as count FROM User');
  return result?.count === 0;
};

export const isTransactionsTableEmpty = async (): Promise<boolean> => {
  const db = await connectToDatabase();
  const result = await db.executeQuery('SELECT COUNT(*) as count FROM Transaction');
  return result?.count === 0;
};

// import SQLite from 'react-native-sqlite-storage';
// import {
//   enablePromise,
//   openDatabase,
// } from "react-native-sqlite-storage"

// enablePromise(true);

// export const connectToDatabase = async () => {
//   return openDatabase(
//     { name: "financeApp.db", location: "default" },
//     () => {},
//     (error) => {
//       console.error(error)
//       throw Error("Could not connect to database")
//     }
//   )
// }

// // Ouvre la base de données de manière synchrone
// // const base = SQLite.openDatabase(
// //   {
// //     name: 'financeApp.db',
// //     location: 'default',
// //   },
// //   () => {
// //     console.log('Database opened successfully');
// //   },
// //   (error:any) => {
// //     console.error('Error opening database', error);
// //   }
// // );

// // export default base;

// // Fonction pour vérifier si la table User est vide
// export const isUserTableEmpty = async () => {
//   let bool: boolean = true;
//   const base = await connectToDatabase();
  
//   await base.transaction( async (tx:any) => {
//     await tx.executeSql(
//       'SELECT COUNT(*) as count FROM User',
//       [],
//       (_:any, resultSet:any) => {
//         const count = resultSet.rows.item(0).count;
//         bool = (count === 0);
//       },
//       (_:any, error:any) => {
//         console.error('Error querying User table', error);
//         bool = true;
//       }
//     );
//   });
  
//   return bool;
// };

// // Fonction pour vérifier si la table Transactions est vide
// export const isTransactionsTableEmpty = async () => {
//   let bool: boolean = true;
//   const base = await connectToDatabase();
  
//   await base.transaction( async (tx:any) => {
//     await tx.executeSql(
//         'SELECT COUNT(*) as count FROM Transactions',
//         [],
//         (_:any, resultSet:any) => {
//           const count = resultSet.rows.item(0).count;
//           bool = (count === 0);
//         },
//         (_:any, error:any) => {
//           console.error('Error querying Transactions table', error);
//           bool = true;
//         }
//       );
//     });
  
//   return bool;
// };

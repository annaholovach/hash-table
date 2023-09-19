class CustomHashTable {
    constructor(initialCapacity = 13, loadFactor = 0.75) {
        // Create an array to represent the hash table with the specified initial capacity.
        this.table = new Array(initialCapacity)
        // Keep track of the number of entries in the hash table.
        this.size = 0
        // The load factor, which indicates when to resize the table.
        this.loadFactor = loadFactor
    }

    // Helper function to check if the hash table needs to be resized
    shouldResize() {
        return this.size / this.table.length >= this.loadFactor
    }

    // Helper function to resize the hash table
    resize(newCapacity) {
        const oldTable = this.table
        this.table = new Array(newCapacity)
        this.size = 0

        // Rehash and insert existing key-value pairs into the new table.
        oldTable.forEach(index => {
            if (index) {
                for (const [key, value] of index) {
                    this.insert(key, value)
                }
            }
        })
    }
    
    // Hashing function that computes the hash for the input key.
    hash(key) {
        let hash = 0
        for (let i = 0; i < key.length; i++){
            hash = hash + key.charCodeAt(i) * i
        }
        return hash % this.table.length
    }
    
    // Insert method to add a key-value pair to the hash table.
    insert(key, value) {
        const index = this.hash(key)
        if (this.table[index]) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index][i][1] = value
                    return
                }
            }
            // If the key doesn't exist in the bucket, add it as a new entry.
            this.table[index].push([key, value])
        } else {
            this.table[index] = []
            this.table[index].push([key, value])
        }
        this.size++

        // Check if resizing is needed after insertion.
        if(this.shouldResize()) {
            this.resize(this.table.length * 2)
        }
    }
    
    // Get method to retrieve the value associated with a key.
    get(key) {
        const index = this.hash(key)
        if (this.table[index]) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    return this.table[index][i][1]
                }
            }
        }
        // Return undefined if key is not found.
        return undefined
    }
    
     // Delete method to remove a key-value pair from the hash table.
    delete(key) {
        const index = this.hash(key)
        if (this.table[index] && this.table[index].length) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index].splice(i, 1)
                    this.size--
                    // Return true if the key was successfully deleted.
                    return true
                }
            }
        }
        // Return false if the key was not found.
        return false
    }

    // Print the hash table
    dump() {
        this.table.forEach((value, index) => {
            const chainedValues = value.map(
                ([key, value]) => `[${key}: ${value}]`
            )
            console.log(`${index} : ${chainedValues}`);
        })
    }
}

const ht = new CustomHashTable()

// inserting keys and values into hash table
ht.insert('gucci', 'Gucci')
ht.insert('gang', 'gang')
ht.insert('ooh', 'ooh')
ht.insert('Yuh', 'Yuh')
ht.insert('Lil', 'Lil')
ht.insert('Pump', 'Pump')
ht.insert('Spend', 'Spend')
ht.insert('three', 'three')
ht.insert('racks', 'racks')
ht.insert('on', 'on')
ht.insert('new', 'new')
ht.insert('chain', 'chain')

// log hash table
ht.dump()
console.log(ht.get('chain'));




  
import { database, fire, auth } from "@/services/firebase";
export default {
  async getAllMemories() {
    let memories = []
    const starCountRef = fire.dbRef(database, "memory");

  
      fire.onValue(starCountRef, (snapshot) => {
      if(snapshot.val()){
      Object.entries(snapshot.val()).forEach(([key, value]) => {
        memories.push({
          uid: key,
          ...value,
        });
      });
        this.memories = memories
      }
      })
  },
  async getMemory() {
    const starCountRef = fire.dbRef(database, "memory/" + this.userId);

    fire.onValue(starCountRef, (snapshot) => {
      if (snapshot.val()) {
        this.memory = snapshot.val();
      }
    });

    if (Object.keys(this.memory).length === 0) {
      fire.set(fire.dbRef(database, "memory/" + this.userId), {
        score: 0,
        choices: 48,
        highestScore: 0,
        rounds: 0,
      });
      this.getMemory();
    }
  },
  setMemoryValue(value) {
    console.log(value);
    fire.set(fire.dbRef(database, "memory/" + this.userId), this.memory);
    this.getMemory();
  },
};

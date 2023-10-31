import { database, fire, auth } from "@/services/firebase";
export default {
  async getAllMemories() {
    const starCountRef = fire.dbRef(database, "memory");

    const result = new Promise((resolve) => {
      fire.onValue(starCountRef, (snapshot) => {
        resolve(snapshot.val());
      });
    });

    const data = await result;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        this.memories.push({
          uid: key,
          ...value,
        });
      });
    }
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

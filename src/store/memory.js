import { database, fire, auth } from "@/services/firebase";
export default {
  async getAllMemories() {
    const starCountRef = fire.dbRef(database, "memory");

    fire.onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        Object.entries(snapshot.val()).forEach(([key, value]) => {
          let data = {};
          data = {
            uid: key,
            ...value,
          };
          console.log(data);
          if (!this.memories.some((m) => m.uid === data.uid)) {
            this.memories.push(data);
          } else {
            let index = this.memories.findIndex((m) => m.uid === data.uid);
            this.memories[index] = data;
          }
        });
      }
    });
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

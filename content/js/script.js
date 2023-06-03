
function getRandomValue(max , min){
  return ( Math.floor(Math.random() * (max - min)) + min);
}


const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },
  methods: {
    monsterAttack() {
      this.currentRound++;
      const monsterVlue = getRandomValue(12, 5);
      this.monsterHealth -= monsterVlue;
      this.playerAttack();
    },
    playerAttack() {
      const monsterVlue = getRandomValue(15, 8);
      this.playerHealth -= monsterVlue;
    },
    specialAttack() {
      this.currentRound++;
      const monsterVlue = getRandomValue(10, 25);
      this.monsterHealth -= monsterVlue;
      this.playerAttack();
    },
    healPlayer() {
      this.currentRound++;
      const healVlue = getRandomValue(15, 8);
      if (this.playerHealth + healVlue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healVlue;
      }
      this.monsterAttack();
    },
    getStart(){
       this.playerHealth= 100;
      this.monsterHealth= 100;
      this.currentRound= 0;
      this.winner= null;
    },
    surrender(){
      this.winner='monster'
    },
    addLogMessage(who , what , value){

    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monasterStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
}).mount("#game");
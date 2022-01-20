new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    attackRecords : []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.attackRecords = [];
    },
    getRandomNumber: function (MAX, MIN) {
      return Math.floor(Math.random() * (MAX - MIN)) + MIN;
    },
    attack() {
      let monsterDamage = this.getRandomNumber(10, 3);
      this.monsterHealth -= monsterDamage;

      this.attackRecords.unshift({
        isPlayer:true,
        text:'Player hits for monster : '+ monsterDamage
      })

      if (this.winTrack()) {
        return;
      }

      this.monsterAttack();
    },
    specialAttack() {
      let monsterDamage = this.getRandomNumber(20, 10);
      this.monsterHealth -= monsterDamage;
      
      this.attackRecords.unshift({
        isPlayer:true,
        text:'Player hits Special attack for monster : '+monsterDamage
      });

      if (this.winTrack()) {
        return;
      }

      this.monsterAttack();
    },

    heal()
    {
        let healPlayer = this.getRandomNumber(8, 15);
        if(this.playerHealth+healPlayer < 100)
        {
            this.playerHealth+=healPlayer;
        }
        else{
            this.playerHealth = 100;
        }

        this.attackRecords.unshift({
            isPlayer:true,
            text:'Player heal the health with : '+healPlayer
          });

        this.monsterAttack();
    },
    giveUp()
    {
       this.gameIsRunning = false;
       this.attackRecords.unshift({
        isPlayer:true,
        text:'Player give up the game'
      });
    },
    monsterAttack() {
      let playerDamage = this.getRandomNumber(12, 5);
      this.playerHealth -= playerDamage;

      this.attackRecords.unshift({
        isPlayer:false,
        text:'Monster hits for Player : '+playerDamage
      });

      this.winTrack();
    },
    winTrack() {
      if (this.monsterHealth <= 0 && this.playerHealth > 0) {
        if (confirm("You won ? You want to New Game")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.monsterHealth > 0 && this.playerHealth <= 0) {
        if (confirm("You Lose ? You want to New Game")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});

import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router) { }

  newGame() {
    const game = new Game();

    const gamesRef = collection(this.firestore, 'games');

    addDoc(gamesRef, game.toJson())
      .then((gameInfo) => {
        // console.log('Spiel gespeichert mit ID:', gameInfo.id);
        this.router.navigateByUrl('/game/' + gameInfo.id);
      })
      .catch((error) => {
        // console.error('Fehler beim Speichern:', error);
      });
  }

}

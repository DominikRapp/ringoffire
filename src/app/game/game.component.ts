import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
  gameId!: string;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.gameId = id;
      console.log('Aktuelle ID:', id);

      // (optional) gesamte Collection anhören – nur Debug
      const gamesRef = collection(this.firestore, 'games');
      collectionData(gamesRef).subscribe((games) => {
        console.log('Game update (alle):', games);
      });

      // einzelnes Dokument anhören
      if (id) {
        const gameDoc = doc(this.firestore, 'games', id);
        docData(gameDoc).subscribe((game: any) => {
          if (!game) {
            console.warn('Dokument nicht gefunden oder leer');
            return;
          }

          // sicher mergen (falls einzelne Felder fehlen)
          this.game.currentPlayer = game.currentPlayer ?? this.game.currentPlayer;
          this.game.playedCards = game.playedCards ?? this.game.playedCards;
          this.game.players = game.players ?? this.game.players;
          this.game.stack = game.stack ?? this.game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation ?? this.game.pickCardAnimation;
          this.game.currentCard = game.currentCard ?? this.game.currentCard;

          // (optional) Debug:
          console.log('Game update (doc):', game);
        });
      }
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      console.log('New card: ', this.game.currentCard);
      console.log('Game is', this.game);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.trim().length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  async saveGame() {
    const gameRef = doc(this.firestore, 'games', this.gameId);
    await updateDoc(gameRef, this.game.toJson());
  }

}

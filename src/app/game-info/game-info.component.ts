import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {

  cardAction = [
    {
      title: 'Waterfall',
      description: 'Everyone starts drinking at the same time. No one may stop before the person to their left has stopped. The first person may stop whenever they want, and then everyone else follows in order.'
    },
    {
      title: 'You',
      description: 'You choose one person who has to drink.'
    },
    {
      title: 'Me',
      description: 'You have to drink. Cheers!'
    },
    {
      title: 'Category',
      description: 'Choose a category (e.g., beer brands, car brands, colors). Each player must name something from this category in turn. Whoever can’t think of anything or repeats something has to drink.'
    },
    {
      title: 'Dance Move',
      description: 'The first player makes a movement or sound. The next one has to repeat everything and add something new. Anyone who makes a mistake or takes too long drinks.'
    },
    {
      title: 'Girls Drink',
      description: 'All girls drink.'
    },
    {
      title: 'Heaven',
      description: 'Everyone must raise their hand up. The last person to react drinks.'
    },
    {
      title: 'Drinking Buddy',
      description: 'Pick a drinking buddy. From now on, your mate must drink whenever you drink – and vice versa.'
    },
    {
      title: 'Thumb Master',
      description: 'You are the Thumb Master. At any time, secretly place your thumb on the table. The last person to do the same drinks. You remain Thumb Master until someone else draws a 9.'
    },
    {
      title: 'Guys Drink',
      description: 'All guys drink.'
    },
    {
      title: 'Quizmaster',
      description: 'You are the Quizmaster. If you ask a question and someone answers, that person has to drink. You stay Quizmaster until another Jack is drawn.'
    },
    {
      title: 'Never Have I Ever',
      description: 'Say: “Never have I ever…” + something you’ve never done. Everyone who has done it must drink.'
    },
    {
      title: 'New Rule',
      description: 'Create a new rule (e.g., “No one is allowed to say the word ‘drink’”). Anyone who breaks it must drink. The rule remains until the end of the game.'
    }
  ];

  title = '';
  description = '';

  @Input() card!: string;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.card) {
      // console.log('Current card is:', this.card);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}

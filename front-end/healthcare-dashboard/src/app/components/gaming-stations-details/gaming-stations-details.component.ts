import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OldAgeHeaderComponent } from '../old-age-header/old-age-header.component';

@Component({
  selector: 'app-gaming-stations-details',
  standalone:true,
  imports:[OldAgeHeaderComponent,RouterModule,CommonModule,FormsModule],
  templateUrl: './gaming-stations-details.component.html',
  styleUrls: ['./gaming-stations-details.component.scss']
})
export class GamingStationsDetailsComponent {
  games: string[] = [];

  constructor(private gamingService: GameService) {}

  ngOnInit(): void {
    this.gamingService.getGamingActivities().subscribe(data => {
      this.games = data;
    });
  }
}

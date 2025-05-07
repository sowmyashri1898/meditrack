import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { HttpClient } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OldAgeHeaderComponent } from "../old-age-header/old-age-header.component";
type SolutionKey =
  | 'Virtual Reality'
  | 'Smart Screens'
  | 'Fitness'
  | 'Gaming Stations';
@Component({
  selector: 'app-old-age-home',
  standalone: true,
  imports: [CardModule, CommonModule, RouterModule, OldAgeHeaderComponent],
  templateUrl: './old-age-home.component.html',
  styleUrl: './old-age-home.component.scss'
})
export class OldAgeHomeComponent implements OnInit{
  message: string = '';
  selectedSolution: {
    title: SolutionKey;
    description: string;
    imageUrl: string;
    videoId?: string;
    appLink?: string;
  } | null = null;
  fitnessData: any = null;
  gameData: any = null;

  successMetrics = {
    residentsEngaged: 0,
    physicalHealthImprovement: 0,
    cognitiveHealthImprovement: 0,
  };

  solutions = [
    {
      title: 'Virtual Reality',
      description:
        'Immerse yourself in virtual environments for various experiences.',
      imageUrl: 'assets/vr-image.jpeg',
      videoId: 'some_video_id',
    },
    {
      title: 'Smart Screens',
      description: 'Interactive smart screens for an engaging experience.',
      imageUrl: 'assets/smart-screens.jpeg',
      appLink: 'https://www.smart-screens.com',
    },
    {
      title: 'Fitness',
      description: 'Engage in fitness programs for seniors.',
      imageUrl: 'assets/fitness.jpeg',
    },
    {
      title: 'Gaming Stations',
      description: 'Games to keep you entertained and mentally active.',
      imageUrl: 'assets/gaming.jpeg',
    },
  ];

  relatedApps: RelatedApps = {
    'Virtual Reality': [
      {
        title: 'Oculus Rift',
        description: 'Explore immersive VR worlds.',
        appLink: 'https://www.oculus.com/',
        imageUrl: 'assets/oculus.png',
      },
      {
        title: 'HTC Vive',
        description: 'Advanced VR technology for a fully immersive experience.',
        appLink: 'https://www.vive.com/',
        imageUrl: 'assets/htc-vive.png',
      },
    
      {
        title: 'Beat Saber',
        description: 'An immersive VR rhythm game where you slice beats.',
        appLink: 'https://beatsaber.com/',
        imageUrl: 'assets/beat-saber.png', // Add appropriate image URL for Beat Saber app
      },
      {
        title: 'Nature Treks VR',
        description:
          'A relaxing VR experience where you explore beautiful environments.',
        appLink: 'https://naturetreksvr.com/',
        imageUrl: 'assets/nature-treks-vr.png', // Add appropriate image URL for Nature Treks VR app
      },
      {
        title: 'Real VR Fishing',
        description:
          'Experience the thrill of fishing in a relaxing VR environment.',
        appLink: 'https://www.realvrfishing.com/',
        imageUrl: 'assets/real-vr-fishing.png', // Add appropriate image URL for Real VR Fishing app
      },
      {
        title: 'YouTube VR',
        description:
          'Watch YouTube in virtual reality with a fully immersive experience.',
        appLink: 'https://www.youtube.com/vr',
        imageUrl: 'assets/youtube-vr.png', // Add appropriate image URL for YouTube VR app
      },
      {
        title: 'Walkabout Mini Golf VR',
        description: 'Mini-golf in VR with friends.',
        appLink: 'https://walkaboutminigolf.com/',
        imageUrl: 'assets/walkabout-mini-golf-vr.png', // Add appropriate image URL for Walkabout Mini Golf VR app
      },
      {
        title: 'National Geographic',
        description: 'Explore immersive nature documentaries in VR.',
        appLink: 'https://www.nationalgeographic.com/vr',
        imageUrl: 'assets/national-geographic-vr.png', // Add appropriate image URL for National Geographic VR app
      },
      {
        title: 'Rec Room',
        description:
          'A social VR app for playing games and interacting with others.',
        appLink: 'https://recroom.com/',
        imageUrl: 'assets/rec-room.png', // Add appropriate image URL for Rec Room app
      },
      {
        title: 'ChilloutVR',
        description: 'A social VR app for exploring worlds and meeting people.',
        appLink: 'https://www.chilloutvr.com/',
        imageUrl: 'assets/chillout-vr.png', // Add appropriate image URL for ChilloutVR app
      },
      {
        title: 'Google Earth VR',
        description: 'Explore the world in VR with Google Earth.',
        appLink: 'https://www.google.com/earth/versions/#earth-vr',
        imageUrl: 'assets/google-earth-vr.png', // Add appropriate image URL for Google Earth VR app
      },
      {
        title: 'Guided Tai Chi',
        description: 'Learn Tai Chi with a virtual reality guided experience.',
        appLink: 'https://www.guidedtaichi.com/',
        imageUrl: 'assets/guided-tai-chi.png', // Add appropriate image URL for Guided Tai Chi app
      },
      {
        title: 'Ocean Rift',
        description: 'Explore the underwater world in VR.',
        appLink: 'https://www.oceanrift.com/',
        imageUrl: 'assets/ocean-rift.png', // Add appropriate image URL for Ocean Rift app
      },
      {
        title: 'Puzzling Places',
        description:
          'A relaxing VR puzzle game where you piece together 3D puzzles.',
        appLink: 'https://www.puzzlingplaces.com/',
        imageUrl: 'assets/puzzling-places.png', // Add appropriate image URL for Puzzling Places app
      },
      {
        title: 'Spacefolk City',
        description:
          'Build and explore a city in space in this relaxing VR experience.',
        appLink: 'https://www.spacefolkcity.com/',
        imageUrl: 'assets/spacefolk-city.png', // Add appropriate image URL for Spacefolk City app
      },
    ],

    'Smart Screens': [
      {
        title: 'Samsung Smart TV',
        description:
          'Smart TV with voice recognition and interactive features.',
        appLink: 'https://www.samsung.com/smart-tv',
        imageUrl: 'assets/samsung-tv.png',
      },

      {
        title: 'GrandPad',
        description:
          'A tablet designed specifically for seniors, with easy communication features.',
        appLink: 'https://www.grandpad.net/',
        imageUrl: 'assets/grandpad.png', 
      },
      {
        title: 'Echo Show',
        description:
          'Voice-controlled smart display that allows video calls and reminders for seniors.',
        appLink: 'https://www.amazon.com/echo-show',
        imageUrl: 'assets/echo-show.png', 
      },
      {
        title: 'Lively Mobile Plus',
        description:
          'A smart device for seniors with emergency response, health tracking, and two-way communication.',
        appLink: 'https://www.lively.com/',
        imageUrl: 'assets/lively-mobile-plus.png', 
      },
      {
        title: 'Nanna’s Companion',
        description:
          'A smart device with an easy interface for video calls, reminders, and daily check-ins.',
        appLink: 'https://www.nannascompanion.com/',
        imageUrl: 'assets/nannas-companion.png', 
      },
      {
        title: 'On Time 4 You',
        description:
          'A smart screen app designed for seniors to schedule tasks, reminders, and stay connected with loved ones.',
        appLink: 'https://ontime4you.com/',
        imageUrl: 'assets/on-time-4-you.png', 
      },
      {
        title: 'Joy for All Companion Pets',
        description:
          'Robotic pets with interactive features designed to provide companionship for seniors.',
        appLink: 'https://joyforall.com/',
        imageUrl: 'assets/joy-for-all.png', 
      },
      {
        title: 'ViewClix',
        description:
          'A digital photo frame with video call capability and family updates for seniors.',
        appLink: 'https://www.viewclix.com/',
        imageUrl: 'assets/viewclix.png', 
      },
      {
        title: 'Skylight Frame',
        description:
          'A digital photo frame that lets family send photos directly to the frame remotely.',
        appLink: 'https://www.skylightframe.com/',
        imageUrl: 'assets/skylight-frame.png', 
      },
      {
        title: 'Google Nest Hub',
        description:
          'A smart display that integrates with Google Assistant for easy communication and reminders.',
        appLink: 'https://store.google.com/us/product/nest_hub_2nd_gen',
        imageUrl: 'assets/google-nest-hub.png', 
      },
      {
        title: 'Kinto',
        description:
          'A senior-friendly communication platform that allows video calls, reminders, and easy interaction.',
        appLink: 'https://www.kinto.com/',
        imageUrl: 'assets/kinto.png', 
      },
    ],
    Fitness: [
      {
        title: 'Fitbit',
        description: 'Track your fitness goals with this smart device.',
        appLink: 'https://www.fitbit.com/',
        imageUrl: 'assets/fitbit.png',
      },
      {
        title: 'MyFitnessPal',
        description: 'Track your food and exercise.',
        appLink: 'https://www.myfitnesspal.com/',
        imageUrl: 'assets/myfitnesspal.png',
      },
      {
        title: 'C25K',
        description: 'Running program app to go from Couch to 5K.',
        appLink: 'https://www.c25k.com',
        imageUrl: 'assets/C25K-LOGO3.png', // Add image URL if available
      },
      {
        title: 'Yoga Down Dog',
        description: 'Senior-friendly yoga app for various skill levels.',
        appLink: 'https://www.downdogapp.com',
        imageUrl: 'assets/yoga-down-dog.png',
      },
      {
        title: 'J & J Official 7 Minute Workout',
        description: 'Science-based interval workout app for quick exercises.',
        appLink: 'https://www.7minuteworkout.com',
        imageUrl: 'assets/jj-7min-workout.png',
      },
      {
        title: 'Silver Sneakers GO',
        description: 'Fitness app specifically for seniors.',
        appLink: 'https://www.silversneakers.com',
        imageUrl: 'assets/silver-sneakers-go.jpeg',
      },
      {
        title: 'Map My Walk',
        description: 'Walking and running tracker app.',
        appLink: 'https://www.mapmywalk.com',
        imageUrl: 'assets/map-my-walk.jpeg',
      },
      {
        title: 'Seven - 7 Minute Workout',
        description: 'Quick and effective workout app.',
        appLink: 'https://www.seven.app',
        imageUrl: 'assets/seven-7min-workout.png',
      },

      {
        title: 'Mighty: Health Coach for 50+',
        description: 'Wellness program tailored for people over 50.',
        appLink: 'https://www.mightyhealth.com',
        imageUrl: 'assets/mighty-health.png',
      },
      {
        title: 'Workout Trainer',
        description: 'At-home bodyweight workout app.',
        appLink: 'https://www.workouttrainer.com',
        imageUrl: 'assets/workout-trainer.png',
      },
      {
        title: 'Noom',
        description: 'Weight loss and health app with personalized coaching.',
        appLink: 'https://www.noom.com',
        imageUrl: 'assets/noom.png',
      },
    ],
    'Gaming Stations': [
      {
        title: 'PlayStation 5',
        description: 'Next-gen gaming experience.',
        appLink: 'https://www.playstation.com/en-us/playstation-gift-cards/',
        imageUrl: 'assets/playstation.jpeg',
      },
      {
        title: 'Xbox Series X',
        description: 'The most powerful gaming console.',
        appLink: 'https://www.xbox.com/en-IN/apps/xbox-app-on-pc',
        imageUrl: 'assets/gaming.jpeg',
      },

      {
        title: 'Wii Fit Plus',
        description:
          'A fitness game that combines physical activities and gaming for exercise and fun.',
        appLink: 'https://www.nintendo.com/wii/fit-plus/',
        imageUrl: 'assets/wii-fit-plus.png',
      },
      {
        title: 'Nintendo Switch',
        description:
          'A hybrid gaming console that allows both handheld and docked gaming experiences.',
        appLink: 'https://www.nintendo.com/switch/',
        imageUrl: 'assets/nintendo-switch.png',
      },
      {
        title: 'Brain Age',
        description:
          'A brain-training game designed to boost cognitive functions like memory, math, and logic.',
        appLink: 'https://www.nintendo.com/brain-age/',
        imageUrl: 'assets/brain-age.png',
      },
      {
        title: 'Lumosity',
        description:
          'A collection of cognitive training games to improve memory, attention, and problem-solving skills.',
        appLink: 'https://www.lumosity.com/',
        imageUrl: 'assets/lumosity.png',
      },
      {
        title: 'Chess.com',
        description:
          'An online platform for playing chess against others, designed to challenge the mind.',
        appLink: 'https://www.chess.com/',
        imageUrl: 'assets/chess.com.png',
      },
      {
        title: 'Sudoku',
        description:
          'A classic puzzle game that stimulates the brain and improves cognitive functions.',
        appLink: 'https://www.websudoku.com/',
        imageUrl: 'assets/sudoku.png',
      },
      {
        title: 'Fitbit Adventure Games',
        description:
          'Games that combine fitness and adventure, allowing seniors to stay active while having fun.',
        appLink: 'https://www.fitbit.com/',
        imageUrl: 'assets/fitbit-adventure.png',
      },
      {
        title: 'Rec Room',
        description:
          'A social VR game with multiple activities, including puzzles, adventures, and mini-games for cognitive stimulation.',
        appLink: 'https://recroom.com/',
        imageUrl: 'assets/rec-room.png',
      },
      {
        title: 'Puzzling Places',
        description:
          'A VR game that allows players to build puzzles from real-world places, promoting mental sharpness.',
        appLink: 'https://www.puzzlingplaces.com/',
        imageUrl: 'assets/puzzling-places.png',
      },
      {
        title: 'Wordscapes',
        description:
          'A word puzzle game that boosts vocabulary, spelling, and cognitive function.',
        appLink: 'https://www.peoplefun.com/wordscapes',
        imageUrl: 'assets/wordscapes.png',
      },
      {
        title: 'Oculus Quest',
        description:
          'A VR headset offering a wide variety of virtual reality games, from fitness to puzzle-solving.',
        appLink: 'https://www.oculus.com/quest/',
        imageUrl: 'assets/oculus-quest.png',
      },
    ],
  };

  constructor(
    private webSocketService: WebsocketService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Fetch fitness data and gaming data
    // this.http.get('https://wger.de/api/v2/exercise/').subscribe(data => {
    //   this.fitnessData = data;
    // });
    // this.http.get('https://api.rawg.io/api/games?key=YOUR_API_KEY').subscribe(data => {
    //   this.gameData = data;
    // });
    // WebSocket message subscription
    // this.webSocketService.getMessages().subscribe(msg => {
    //   this.message = msg;
    // });
  }

  // Show the related apps for the selected solution
  showRelatedApp(solution: any) {
    this.selectedSolution = solution;
  }

  navigateToApp(appLink: string) {
    window.open(appLink, '_blank');
  }
}

interface App {
  title: string;
  description: string;
  appLink: string;
  imageUrl: string;
}

interface RelatedApps {
  'Virtual Reality': App[];
  'Smart Screens': App[];
  Fitness: App[];
  'Gaming Stations': App[];
}


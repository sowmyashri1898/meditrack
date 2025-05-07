import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Participant } from '../../classes/participants.model';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-video-chat',
  standalone: true,
  imports: [DialogModule,FormsModule,CommonModule],
  templateUrl: './video-chat.component.html',
  styleUrl: './video-chat.component.scss'
})
export class VideoChatComponent implements OnInit{
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  
    localStream!: MediaStream;
    participants: Participant[] = [];
    displayjoinDialog: boolean = false;
    isMuted: boolean = false;
    isVideoOff: boolean = false;
  
    ngOnInit(): void {
      this.setupLocalVideo();
    }
  
    async setupLocalVideo() {
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        this.localVideo.nativeElement.srcObject = this.localStream;
        this.addRemoteParticipant('Alice');  // Example remote participant
      } catch (err) {
        console.error('Error accessing media devices', err);
      }
    }
  
    addRemoteParticipant(name: string) {
      const remoteStream = new MediaStream();
      // Simulate remote video stream. In a real app, this would be a real stream.
      remoteStream.addTrack(this.localStream.getTracks()[0]); // For demonstration, we use the local video track.
      this.participants.push({ name, videoStream: remoteStream });
    }
  
    toggleMute() {
      const audioTracks = this.localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !audioTracks[0].enabled;
        this.isMuted = !this.isMuted;
      }
    }
  
    toggleVideo() {
      const videoTracks = this.localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !videoTracks[0].enabled;
        this.isVideoOff = !this.isVideoOff;
      }
    }
  
    leaveCall() {
      this.localStream.getTracks().forEach(track => track.stop());
      this.displayjoinDialog = false;
    }
  
    hideVideoDialog() {
      this.leaveCall();
    }
  }
  

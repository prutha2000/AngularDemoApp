import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/Models/Member';
import { ActivatedRoute } from '@angular/router'
import { MembersService } from 'src/app/_services/members.service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private router: ActivatedRoute, private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent:100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:false
      },
    ]    
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for(const photo of this.member.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
      return imageUrls;
    }
  }

  loadMembers() {
    this.memberService.getMember(this.router.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
    })
  }

}

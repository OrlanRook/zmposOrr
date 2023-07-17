import { Component, OnInit } from '@angular/core';
import { IBranch } from 'src/app/admin/records/branches/branches.interface';
import { BranchesService } from 'src/app/admin/records/branches/branches.service';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';
import { IProfile } from './profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  dataBinding: IProfile = this.token.getUser();

  branches: IBranch[] = []

  constructor(private token: TokenStorageService,
              private branchService: BranchesService) {

    this.branchService.getUserBranch(this.dataBinding.id).subscribe((branches: IBranch[])=>{
      this.branches = branches;
    });
  }

  ngOnInit(): void {
  }

}

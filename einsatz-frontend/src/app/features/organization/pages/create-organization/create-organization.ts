import { Component, inject } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { AuthService } from '../../../../core/services/auth.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { OrganizationService } from '../../../../core/services/organization.service';

@Component({
  selector: 'app-create-organization',
  imports: [MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    CommonModule],
  templateUrl: './create-organization.html',
  styleUrl: './create-organization.css',
})
export class CreateOrganization {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private orgService = inject(OrganizationService)

  currentUser = this.authService.getUser();

  createOrgForm = this.fb.group({
    name: ['', Validators.required],
    domain: ['', Validators.required],
    orgOwner: [{
      value: this.currentUser?.firstName + ' ' + this.currentUser?.lastName,
      disabled: true
    }]
  });




  onSubmit() {
    if (this.createOrgForm.invalid) return;
    const payload = {
      name: this.createOrgForm.value.name!,
      domain: this.createOrgForm.value.domain!
    };

    this.orgService.create(payload).subscribe({
      next: (response: any) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Org creation failed')
      }

    });

  }

}

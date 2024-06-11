import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { MultiClusterService } from '~/app/shared/api/multi-cluster.service';
import { Permissions } from '~/app/shared/models/permissions';
import { AuthStorageService } from '~/app/shared/services/auth-storage.service';

import { FaviconService } from '~/app/shared/services/favicon.service';
import { SummaryService } from '~/app/shared/services/summary.service';
import { TaskManagerService } from '~/app/shared/services/task-manager.service';

@Component({
  selector: 'cd-workbench-layout',
  templateUrl: './workbench-layout.component.html',
  styleUrls: ['./workbench-layout.component.scss'],
  providers: [FaviconService]
})
export class WorkbenchLayoutComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  permissions: Permissions;

  constructor(
    public router: Router,
    private summaryService: SummaryService,
    private taskManagerService: TaskManagerService,
    private multiClusterService: MultiClusterService,
    private faviconService: FaviconService,
    private authStorageService: AuthStorageService
  ) {
    this.permissions = this.authStorageService.getPermissions();
  }

  ngOnInit() {
    if (this.permissions.configOpt.read) {
      this.subs.add(this.multiClusterService.startPolling());
      this.subs.add(this.multiClusterService.startClusterTokenStatusPolling());
    }
    this.subs.add(this.summaryService.startPolling());
    this.subs.add(this.taskManagerService.init(this.summaryService));
    this.faviconService.init();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

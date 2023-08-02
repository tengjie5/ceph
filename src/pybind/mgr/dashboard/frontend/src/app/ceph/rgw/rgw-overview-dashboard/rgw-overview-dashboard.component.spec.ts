import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgwOverviewDashboardComponent } from './rgw-overview-dashboard.component';
import { of } from 'rxjs';
import { RgwDaemonService } from '~/app/shared/api/rgw-daemon.service';
import { RgwDaemon } from '../models/rgw-daemon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardComponent } from '../../dashboard-v3/card/card.component';
import { CardRowComponent } from '../../dashboard-v3/card-row/card-row.component';
import { DimlessBinaryPipe } from '~/app/shared/pipes/dimless-binary.pipe';
import { RgwRealmService } from '~/app/shared/api/rgw-realm.service';
import { RgwZonegroupService } from '~/app/shared/api/rgw-zonegroup.service';
import { RgwZoneService } from '~/app/shared/api/rgw-zone.service';
import { RgwBucketService } from '~/app/shared/api/rgw-bucket.service';
import { RgwUserService } from '~/app/shared/api/rgw-user.service';
import { HealthService } from '~/app/shared/api/health.service';

describe('RgwOverviewDashboardComponent', () => {
  let component: RgwOverviewDashboardComponent;
  let fixture: ComponentFixture<RgwOverviewDashboardComponent>;
  const daemon: RgwDaemon = {
    id: '8000',
    service_map_id: '4803',
    version: 'ceph version',
    server_hostname: 'ceph',
    realm_name: 'realm1',
    zonegroup_name: 'zg1-realm1',
    zone_name: 'zone1-zg1-realm1',
    default: true,
    port: 80
  };

  const realmList = {
    default_info: '20f61d29-7e45-4418-8e19-b7e962e4860b',
    realms: ['realm2', 'realm1']
  };

  const zonegroupList = {
    default_info: '20f61d29-7e45-4418-8e19-b7e962e4860b',
    zonegroups: ['zg-1', 'zg-2', 'zg-3']
  };

  const zoneList = {
    default_info: '20f61d29-7e45-4418-8e19-b7e962e4860b',
    zones: ['zone4', 'zone5', 'zone6', 'zone7']
  };

  const bucketList = [
    {
      bucket: 'bucket',
      owner: 'testid',
      usage: {
        'rgw.main': {
          size_actual: 4,
          num_objects: 2
        },
        'rgw.none': {
          size_actual: 6,
          num_objects: 6
        }
      },
      bucket_quota: {
        max_size: 20,
        max_objects: 10,
        enabled: true
      }
    },
    {
      bucket: 'bucket2',
      owner: 'testid',
      usage: {
        'rgw.main': {
          size_actual: 4,
          num_objects: 2
        },
        'rgw.none': {
          size_actual: 6,
          num_objects: 6
        }
      },
      bucket_quota: {
        max_size: 20,
        max_objects: 10,
        enabled: true
      }
    }
  ];

  const userList = [
    {
      user_id: 'testid',
      stats: {
        size_actual: 6,
        num_objects: 6
      },
      user_quota: {
        max_size: 20,
        max_objects: 10,
        enabled: true
      }
    },
    {
      user_id: 'testid2',
      stats: {
        size_actual: 6,
        num_objects: 6
      },
      user_quota: {
        max_size: 20,
        max_objects: 10,
        enabled: true
      }
    }
  ];

  const healthData = {
    total_objects: '290',
    total_pool_bytes_used: 9338880
  };

  let listDaemonsSpy: jest.SpyInstance;
  let listZonesSpy: jest.SpyInstance;
  let listZonegroupsSpy: jest.SpyInstance;
  let listRealmsSpy: jest.SpyInstance;
  let listBucketsSpy: jest.SpyInstance;
  let listUsersSpy: jest.SpyInstance;
  let healthDataSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RgwOverviewDashboardComponent,
        CardComponent,
        CardRowComponent,
        DimlessBinaryPipe
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    listDaemonsSpy = jest
      .spyOn(TestBed.inject(RgwDaemonService), 'list')
      .mockReturnValue(of([daemon]));
    listRealmsSpy = jest
      .spyOn(TestBed.inject(RgwRealmService), 'list')
      .mockReturnValue(of(realmList));
    listZonegroupsSpy = jest
      .spyOn(TestBed.inject(RgwZonegroupService), 'list')
      .mockReturnValue(of(zonegroupList));
    listZonesSpy = jest.spyOn(TestBed.inject(RgwZoneService), 'list').mockReturnValue(of(zoneList));
    listBucketsSpy = jest
      .spyOn(TestBed.inject(RgwBucketService), 'list')
      .mockReturnValue(of(bucketList));
    listUsersSpy = jest.spyOn(TestBed.inject(RgwUserService), 'list').mockReturnValue(of(userList));
    healthDataSpy = jest
      .spyOn(TestBed.inject(HealthService), 'getClusterCapacity')
      .mockReturnValue(of(healthData));
    fixture = TestBed.createComponent(RgwOverviewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all cards', () => {
    fixture.detectChanges();
    const dashboardCards = fixture.debugElement.nativeElement.querySelectorAll('cd-card');
    expect(dashboardCards.length).toBe(3);
  });

  it('should get corresponding data into Daemons', () => {
    expect(listDaemonsSpy).toHaveBeenCalled();
    expect(component.rgwDaemonCount).toEqual(1);
  });

  it('should get corresponding data into Realms', () => {
    expect(listRealmsSpy).toHaveBeenCalled();
    expect(component.rgwRealmCount).toEqual(2);
  });

  it('should get corresponding data into Zonegroups', () => {
    expect(listZonegroupsSpy).toHaveBeenCalled();
    expect(component.rgwZonegroupCount).toEqual(3);
  });

  it('should get corresponding data into Zones', () => {
    expect(listZonesSpy).toHaveBeenCalled();
    expect(component.rgwZoneCount).toEqual(4);
  });

  it('should get corresponding data into Buckets', () => {
    expect(listBucketsSpy).toHaveBeenCalled();
    expect(component.rgwBucketCount).toEqual(2);
  });

  it('should get corresponding data into Users', () => {
    expect(listUsersSpy).toHaveBeenCalled();
    expect(component.UserCount).toEqual(2);
  });

  it('should get corresponding data into Objects and capacity', () => {
    expect(healthDataSpy).toHaveBeenCalled();
    expect(component.objectCount).toEqual('290');
    expect(component.totalPoolUsedBytes).toEqual(9338880);
  });
});

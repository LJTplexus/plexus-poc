import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroList } from 'src/app/shared/model/hero.interface';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  const mockHeroList: HeroList = {
    id: 1,
    heroName: 'Batman',
    description: 'Amazing hero',
    company: 'Marvel',
    canFly: false,
  };
  const mockHeroName: string = 'Bat';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve hero list from the API via GET', () => {
    service.getHero().subscribe((heroList) => {
      expect(heroList).toEqual(mockHeroList);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/heros');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroList);
  });

  it('should retrieve heros filter by id from the API via GET', () => {
    service.getHeroByFilterId(mockHeroList.id).subscribe((heroList) => {
      expect(heroList).toEqual(mockHeroList);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/heros/' + mockHeroList.id
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroList);
  });

  it('should retrieve heros filter by name from the API via GET', () => {
    service.getHeroByFilterName(mockHeroName).subscribe((heroList) => {
      expect(heroList).toEqual(mockHeroList);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/heros?heroName_like=' + mockHeroName
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroList);
  });

  it('should create hero from the API via POST', () => {
    service.createHero(mockHeroList).subscribe((heroList) => {
      expect(heroList).toEqual(mockHeroList);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/heros');
    expect(req.request.method).toBe('POST');
    req.flush(mockHeroList);
  });

  it('should create hero from the API via POST', () => {
    service.editHero(mockHeroList.id, mockHeroList).subscribe((heroList) => {
      expect(heroList).toEqual(mockHeroList);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/heros/' + mockHeroList.id
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockHeroList);
  });

  it('should delete hero from the API via DELETE', () => {
    service.deleteHero(mockHeroList.id).subscribe((response) => {
      expect(response).toEqual(mockHeroList);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/heros/' + mockHeroList.id
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockHeroList);
  });
});

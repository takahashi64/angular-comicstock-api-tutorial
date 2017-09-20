import { Injectable } from '@angular/core';
import { Issue } from './issue';

@Injectable()
export class IssueService {
	getIssue(): Issue {
	  	return {
		    'id': 55529,
		    'title': 'INVINCIBLE IRON MAN (2015) #8',
		    'description': '“THE WAR MACHINES” PART 3! Spider-Man, War Machine and Iron Man team up to stop a brand new threat to the Marvel Universe… like only they can. All this plus more hints to next summer’s insane Marvel blockbuster event.',
		    'seriesNumber': -1,
		    'publicationDate': '2016-01-14T15:58:19Z',
		    'publisherId': 0,
		    'publisher': 'Marvel',
		    'creators': [],
		    'stock': [],
		    'thumbnail': {
		      'path': 'http://i.annihil.us/u/prod/marvel/i/mg/4/a0/5697c5cd88870',
		      'extension': 'jpg',
		      'pathIncludingExtension': 'http://i.annihil.us/u/prod/marvel/i/mg/4/a0/5697c5cd88870.jpg'
		    },
		    'images': [
		      {
		        'path': 'http://i.annihil.us/u/prod/marvel/i/mg/4/a0/5697c5cd88870',
		        'extension': 'jpg',
		        'pathIncludingExtension': 'http://i.annihil.us/u/prod/marvel/i/mg/4/a0/5697c5cd88870.jpg'
		      }
		    ]
		};
  }
}


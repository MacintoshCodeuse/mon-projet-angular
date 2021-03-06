import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-appareil-view',
	templateUrl: './appareil-view.component.html',
	styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
	isAuth = false;
	appareils: any[];
	appareilSubscription: Subscription;

	lastUpdate = new Promise((resolve, reject) => {
		const date = new Date();
		setTimeout(
			() => {
				resolve(date);
			}, 2000
		);
	});

	constructor(private appareilService: AppareilService) {
		setTimeout(
			() => {
				this.isAuth = true;
			}, 4000
		);
	}

	ngOnInit() {
		this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
			(appareils: any[]) => {
				this.appareils = appareils;
			}
		);
		this.appareilService.emitAppareilSubject();
	}

	ngOnDestroy() {
		this.appareilSubscription.unsubscribe();
	}

	onEteindre() {
		if (confirm('Etes-vous sûr de vouloir éteindre vos appareils ?')) {
			this.appareilService.switchOffAll();
		} else {
			return null;
		}
	}

	onAllumer() {
		this.appareilService.switchOnAll();
	}

	onSave() {
		this.appareilService.saveAppareilToServer();
	}

	onFetch() {
		this.appareilService.getAppareilFromServer();
	}

}

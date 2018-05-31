import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class AppareilService {

		appareilsSubject = new Subject<any[]>();

		private appareils = [
		{
			id: 1,
			name: 'Machine à laver',
			status: 'éteint'
		},
		{
			id: 2,
			name: 'frigo',
			status: 'éteint'
		},
		{
			id: 3,
			name: 'ordinateur',
			status: 'allumé'
		}
	]

	constructor(private httpClient: HttpClient) {

	}

	emitAppareilSubject() {
		this.appareilsSubject.next(this.appareils.slice());
	}

	switchOnAll() {
		for(let appareil of this.appareils) {
			appareil.status = 'allumé';
		}
		this.emitAppareilSubject();
	}

	switchOffAll() {
		for(let appareil of this.appareils) {
			appareil.status = 'éteint';
		}
		this.emitAppareilSubject();
	}

	switchOnOne(i: number) {
			this.appareils[i].status = 'allumé';
			this.emitAppareilSubject();
	}

	switchOffOne(i: number) {
			this.appareils[i].status = 'éteint';
			this.emitAppareilSubject();
	}

	getAppareilById(id: number) {
		const appareil = this.appareils.find(
			(appareilObject) => {
				return appareilObject.id === id;
			}
		);
		return appareil;
	}

	addAppareil(name: string, status: string) {
		const appareilObject = {
			id: 0,
			name: '',
			status: ''
		}
		appareilObject.name = name;
		appareilObject.status = status;
		appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
		this.appareils.push(appareilObject);
		this.emitAppareilSubject();
	}

	saveAppareilToServer() {
		this.httpClient.put('https://mon-projet-angular-f48a6.firebaseio.com/appareils.json', this.appareils).subscribe(
			() => {
				console.log('enregistrement terminé');
			},
			(error) => {
				console.log('Erreur de sauvegarde' + error);
			}
		);
	}

	getAppareilFromServer() {
		this.httpClient.get<any[]>('https://mon-projet-angular-f48a6.firebaseio.com/appareils.json').subscribe(
			(response) => {
				this.appareils = response;
				this.emitAppareilSubject();
			},
			(error) => {
				console.log('erreur de chargement : ' + error);
			}
		)
	}
}

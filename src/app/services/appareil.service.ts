export class AppareilService {
    appareils = [
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

  switchOnAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
  }

  switchOffAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
  }

  switchOnOne(i: number) {
      this.appareils[i].status = 'allumé';
  }

  switchOffOne(i: number) {
      this.appareils[i].status = 'éteint';
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }

    );
    return appareil;
  }
}

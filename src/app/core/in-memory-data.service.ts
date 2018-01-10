import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../model/user.model';


export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      // {id: 0, label: 'События', content: 'Все события тут' },
      // {id: 1, label: 'Аналитика', content: 'Аналитика тут' },
      // {id: 2, label: 'Платежи', content: 'История платежей тут' },
      // {id: 3, label: 'Сообщения', content: 'Все сообщения тут' },
      // {id: 4, label: 'Новости', content: 'Все новости тут' },
    ];
    return { users } ;
  }
}

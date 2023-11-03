import { HasFormatter } from '../interfaces/HasFormatter';

export class ListTemplate {
  constructor(private container: HTMLUListElement) {}

  render(item: HasFormatter, heading: string, pos: 'start' | 'end') {
    const li = document.createElement('li') as HTMLLIElement;
    const h4 = document.createElement('h4') as HTMLHeadingElement;
    h4.innerText = heading;
    li.append(h4);

    const p = document.createElement('p') as HTMLParagraphElement;
    p.innerText = item.format();
    li.append(p);

    if (pos === 'start') {
      this.container.prepend(li);
    } else {
      this.container.append(li);
    }
  }
}

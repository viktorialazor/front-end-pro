import tableTemplate from './StudentsTableView.html';

export default class StudentsTableView {
  #$container;

  constructor($container) {
    this.#$container = $container;
  }

  renderTable() {
    const tableHtml = this.generateTableHtml();

    this.#$container.append(tableHtml);
  }

  generateTableHtml() {
    return tableTemplate;
  }
}

class StudentsTableView {
  #$container;

  constructor($container) {
    this.#$container = $container;
  }

  renderTable() {
    const tableHtml = this.generateTableHtml();

    this.#$container.append(tableHtml);
  }

  generateTableHtml() {
    return `
      <table class="students-marks">
        <thead class="students-marks__headline headline">
          <tr class="headline__row">
            <td class="headline__text">Name</td>
            <td class="headline__text" colspan="10">Marks</td>
            <td class="headline__text">Actions</td>
          </tr>
        </thead>
      </table>
    `;
  }
}

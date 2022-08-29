class Controller {
  #$container;

  constructor($container) {
    this.#$container = $container;

    this.collection = new Collection();
    this.studentsTableView = new StudentsTableView(this.#$container);

    this.studentsTableView.renderTable();

    this.studentsInfoView = new StudentsInfoView({
      onDelete: id => this.collection.delete(id).then(() => this.studentsInfoView.deleteElement(id)),
      onUpdate: (id, changes) => this.collection.update(id, changes).then(() => {
        const updateStudent = this.collection.find(id);
        this.studentsInfoView.updateElement(id, updateStudent);
      })
    });

    this.studentsFormView = new StudentsFormView({
      onCreate: newStudent => this.collection.create(newStudent).then((res) => {
        this.studentsInfoView.renderItem(res);
        this.studentsFormView.clearForm();
      })},
      this.#$container);

    this.studentsInfoView.renderInfo(this.#$container);
    this.collection.fetch().then(() => this.renderList());
  }

  renderList() {
    this.studentsInfoView.renderList(this.collection.getList());
  }
}

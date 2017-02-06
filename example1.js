const ListTasks = ({tasks, onToggleStatus}) => {
  return (
    <ul>
      {tasks.map(task =>
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(eventObject) => onToggleStatus(task, eventObject.target.checked)}
            >
            </input>
            {task.completed ? <del>{task.title}</del> : task.title}
          </label>
        </li>)}
    </ul>
  );
};

class AddNewTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(eventObject) {
    eventObject.preventDefault();
    const nuevoTexto = this.newText.value;
    this.props.addTask(nuevoTexto);
    this.newText.value = '';
  }

  focusForm() {
    this.newText.focus();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={(texto) => this.newText = texto }></input>
        <button>Add New Task</button>
      </form>
    );
  }
}

AddNewTask.propTypes = {
  addTask: React.PropTypes.func.isRequired
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this._counter = 0;
    this.state = {
      filter: {isCompleted: false},
      tasks: [
        {id: this._counter++, title: 'lavadora', completed: false},
        {id: this._counter++, title: 'banco', completed: true},
        {id: this._counter++, title: 'walgreens', completed: false},
        {id: this._counter++, title: 'wholefoods', completed: false}
      ]
    };
    this._toggleFilter = this._toggleFilter.bind(this);
    this._toggleTaskStatus = this._toggleTaskStatus.bind(this);
    this._addTask = this._addTask.bind(this);
  }

  componentDidMount() {
    this.myForm.focusForm();
  }

  _toggleFilter(eventObject) {
    this.setState({ filter: {isCompleted: eventObject.target.checked} });
  }

  _toggleTaskStatus(task, newStatus) {
    const {tasks} = this.state;
    const newTasks = tasks.map(oldTask => {
      if(oldTask.id !== task.id) {
        return oldTask;
      } else {
        return {...oldTask, completed: newStatus };
      }
    });
    this.setState({ tasks: newTasks });
  }

  _addTask(text) {
    const {tasks} = this.state;
    this.setState({
      tasks: [...tasks, {
        id: this._counter++,
        title: text,
        completed: false
      }]
    });
  }

  render() {
    const {filter, tasks} = this.state;
    const filteredTasks = !this.state.filter.isCompleted
      ? tasks
      : tasks.filter(task => task.completed === true);
    return (
      <div>
        <h2>Todo App</h2>
        <label>Show completed
          <input
            type="checkbox"
            checked={filter.isCompleted}
            onChange={this._toggleFilter}>
          </input>
        </label>
        <ListTasks tasks={filteredTasks} onToggleStatus={this._toggleTaskStatus}/>
        <AddNewTask addTask={this._addTask} ref={form => this.myForm = form }/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />, document.getElementById('application')
);

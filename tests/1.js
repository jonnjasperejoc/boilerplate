const TodoItem = (props) => <li onClick={props.onClick}>{props.item.text}</li>

class TodoList extends React.Component {
  render() {
    const { items, onItemClick } = this.props;
    return (<ul>
        {items.map((item, index) =>
                   <TodoItem item={item} key={index} onClick={this.handleItemClick.bind(this, item, onItemClick)} />)}
      </ul>);
  }
  
  handleItemClick(item, onItemClick, event) {
    if (item.done) {
      event.preventDefault();
    } else {
      onItemClick(item, event);
    }
  }
}


const items = [ { text: 'Buy grocery', done: true },
  { text: 'Play guitar', done: false },
  { text: 'Romantic dinner', done: false }
];

const App = (props) => <TodoList
  items={props.items}
  onItemClick={(item, event) => { console.log(item, event) }}
/>;

document.body.innerHTML = "<div id='root'></div>";
const rootElement = document.getElementById("root");
ReactDOM.render(<App items={items}/>, rootElement);
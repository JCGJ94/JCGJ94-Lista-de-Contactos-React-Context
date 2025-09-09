import { AddContact } from "./pages/AddContact"

export const initialStore = () => {
  return {
    message: null,
    agendas: null,
    contacts: [],
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    
    case "saveSingleContact":
  return {
    ...store,
    singleContact: action.payload,
  };
    case "addContact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };
    case "saveContacts":
      return {
        ...store,
        contacts: action.payload.contacts,
      };

    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }
}

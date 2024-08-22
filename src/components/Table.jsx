import {Modal} from './Modal';
import React, { useState } from 'react';
import './Table.css';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";


const Table = ({users}) => {

const [moreInfo, setMoreInfo] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const [sorted, setSorted] = useState({ sorted: "id", reversed: false});
const [items, setItems] = useState(users);


//Открытие модального окна
const openModal = event => {
  setMoreInfo(true);
  const id = event.currentTarget.getAttribute("data-rowid"); //номер нажатой строки
  setSelectedItem(id-1);
}

//Сортировка
const sortByName = () => {
  const usersCopy = [...users];
  usersCopy.sort((userA, userB) => {
      const fullNameA = `${userA.firstName} ${userA.maidenName} ${userA.lastName}`;
			const fullNameB = `${userB.firstName} ${userB.maidenName} ${userA.lastName}`;
			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
  });
  setItems(usersCopy);
  setSorted({ sorted: "name", reversed: !sorted.reversed });
}

const sortByAge = () => {
  const usersCopy = [...users];
  usersCopy.sort((userA, userB) => {
    if (sorted.reversed) {
      return userA.age - userB.age
    }
    return userB.age - userA.age
  });
  setItems(usersCopy);
  setSorted({ sorted: "age", reversed: !sorted.reversed });
}

const sortByGender = () => {
  const usersCopy = [...users];
  usersCopy.sort((userA, userB) => {
    if (sorted.reversed) {
      return userA.gender.localeCompare(userB.gender);
    }
    return userB.gender.localeCompare(userA.gender);
  });
  setItems(usersCopy);
  setSorted({ sorted: "gender", reversed: !sorted.reversed });
}

const sortByAddress = () => {
  const usersCopy = [...users];
  usersCopy.sort((userA, userB) => {
      const fullAddressA = `${userA.address.city} ${userA.address.address}`;
			const fullAddressB = `${userB.address.city} ${userB.address.address}`;
			if (sorted.reversed) {
				return fullAddressB.localeCompare(fullAddressA);
			}
			return fullAddressA.localeCompare(fullAddressB);
  });
  setItems(usersCopy);
  setSorted({ sorted: "address", reversed: !sorted.reversed });
}

const cancelSorting = () => {
  setItems(users);
  setSorted({ sorted: "id", reversed: !sorted.reversed });
}

const searchingUser = () => {
  setItems(users);
  setSorted({ sorted: "id", reversed: !sorted.reversed });
}

const renderArrow = () => {
  if (sorted.reversed) {
    return <FaArrowUp />;
  }
  return <FaArrowDown />;
};

return (
  <div className="App">
    <button onClick = {searchingUser}>Search</button>
    <button onClick = {cancelSorting}>Cancel sorting</button>
    <table>
      <thead>
        <tr>
          <th onClick={sortByName}>Name
          {sorted.sorted === "name" ? renderArrow() : null}
          </th>
          <th onClick={sortByAge}>Age
          {sorted.sorted === "age" ? renderArrow() : null}
          </th>
          <th onClick={sortByGender}>Gender
          {sorted.sorted === "gender" ? renderArrow() : null}
          </th>
          <th>Phone</th>
          <th onClick={sortByAddress}>Address
          {sorted.sorted === "address" ? renderArrow() : null}
          </th>
        </tr>
        {      
            items.map((user) => {
                return (
                    <tr key = {user.id} data-rowid={user.id} onClick={openModal}>
                        <td>{`${user.firstName} ${user.maidenName} ${user.lastName}`}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.phone}</td>
                        <td>{`${user.address.city}, ${user.address.address}`}</td>
                    </tr>
                )
            })
        }
      </thead>
      </table>

      <Modal isOpen={moreInfo} onClose={() => setMoreInfo(false)}>
        <h3>Name: <label>{`${users[selectedItem]?.firstName} ${users[selectedItem]?.maidenName} ${users[selectedItem]?.lastName}`}</label></h3>
        <h3>Age: <label>{users[selectedItem]?.age}</label></h3>
        <h3>Address: <label>{`${users[selectedItem]?.address.city}, ${users[selectedItem]?.address.address}`}</label></h3>
        <h3>Height: <label>{users[selectedItem]?.height}</label></h3>
        <h3>Weight: <label>{users[selectedItem]?.weight}</label></h3>
        <h3>Phone: <label>{users[selectedItem]?.phone}</label></h3>
        <h3>Email: <label>{users[selectedItem]?.email}</label></h3>
      </Modal>
      </div>

    )
}     

export default Table;
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const [people, setPeople] = useState([
    {
      id: 1,
      name: "ETH-SWITCH",
      order: 1,
      selected: true,
    },
    {
      id: 2,
      name: "CBS",
      order: 2,
      selected: true,
    },
    {
      id: 3,
      name: "COOP-SWITCH",
      order: 3,
      selected: true,
    },
  ]);

  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);

  // function handleSort() {
  //   const peopleClone = [...people];
  //   const temp = peopleClone[dragPerson.current];
  //   peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current];
  //   peopleClone[draggedOverPerson.current] = temp;
  //   setPeople(peopleClone);
  // }
  function handleSort() {
    const peopleClone = [...people];
    const temp = peopleClone[dragPerson.current];
    peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current];
    peopleClone[draggedOverPerson.current] = temp;
    setPeople(
      peopleClone.map((person, index) => ({ ...person, order: index + 5 }))
    );
  }

  useEffect(() => {
    console.log(people);
    // Log order values after the state updates
    people.forEach((person) => {
      console.log(`${person.name} - Order: ${person.order}`);
    });
  }, [people]);

  const handleKeySelect = (index: number, checked: boolean) => {
    const updatedTemplates = [...people];
    updatedTemplates[index].selected = checked;
    setPeople(updatedTemplates);
  };

  return (
    <main className="">
      <h1 className="text-xl font-bold text-cyan-500">List of Templates</h1>
      {people.map((person, index) => (
        <div
          key={person.id}
          className="relative grid grid-cols-10 space-x-3 rounded m-1 p-2"
          draggable
          onDragStart={() => (dragPerson.current = index)}
          onDragEnter={() => (draggedOverPerson.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>{person.name}</p>
          <input
            id={`default-radio-${index + 1}`}
            type="checkbox"
            checked={person.selected}
            onChange={(e) => handleKeySelect(index, e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      ))}
    </main>
  );
}

import { SmallCloseIcon } from "@chakra-ui/icons";
import { Input, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { capitalizeSingleWord } from "../../util/helper";

export default function AddPlayerFields({ parentCallback }) {
  const [itemsArray, setItemsArray] = useState([
    { firstName: "", lastName: "" },
  ]);

  useEffect(() => {
    parentCallback(itemsArray);
  }, [itemsArray]);

  const handleChange = (index, key, value) => {
    const list = [...itemsArray];
    list[index][key] = capitalizeSingleWord(value);
    setItemsArray(list);
    parentCallback(list);
  };

  const handleDelete = (index) => {
    const list = [...itemsArray];
    list.splice(index, 1);
    setItemsArray(list);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {itemsArray?.map((item, index) => {
        return (
          <div style={{ display: "flex", marginTop: 8 }} key={index}>
            <Input
              mr={2}
              placeholder={`First Name...${index}`}
              value={item.firstName}
              onChange={(e) => {
                handleChange(index, "firstName", e.target.value);
              }}
              isRequired={true}
              name={`firstName${index}`}
            />
            <Input
              mr={2}
              placeholder={`Last Name...${index}`}
              value={item.lastName}
              onChange={(e) => {
                handleChange(index, "lastName", e.target.value);
              }}
              isRequired={true}
              name={`lastName${index}`}
            />
            <IconButton
              icon={<SmallCloseIcon />}
              onClick={() => {
                handleDelete(index);
              }}
              children={"Delete"}
            />
          </div>
        );
      })}
      {/* TODO: figure out how to insert many 3 */}
      {/* <AddButton
        onClick={() => {
          const list = [...itemsArray];
          list.push({ firstName: "", lastName: "" });
          setItemsArray(list);
        }}
      >
        Add Another Player
      </AddButton> */}
    </div>
  );
}

const AddButton = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: 8px 0;
  color: steelblue;
`;

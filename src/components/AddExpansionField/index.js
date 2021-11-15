import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, IconButton, Box } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function AddExpansionField({ parentCallback }) {
  const [workingExpansionList, setWorkingExpansionsList] = useState([]);

  useEffect(() => {
    parentCallback(workingExpansionList);
  }, [workingExpansionList]);

  const handleValueChange = (e, index) => {
    const list = [...workingExpansionList];
    list[index] = e.target.value;
    setWorkingExpansionsList(list);
  };

  const handleDelete = (index) => {
    const list = [...workingExpansionList];
    list.splice(index, 1);
    setWorkingExpansionsList(list);
  };

  const handleOnBlur = () => {
    const list = [...workingExpansionList];
    setWorkingExpansionsList(list);
  };

  return (
    <div>
      {workingExpansionList?.map((item, index) => {
        return (
          <div key={index}>
            <Box p={2}>
              <Input
                autoComplete="off"
                isRequired
                placeholder={`Expansion ${index + 1} Name...`}
                value={item}
                onChange={(e) => {
                  handleValueChange(e, index);
                }}
                onBlur={(e) => {
                  handleOnBlur(e, index);
                }}
                name={`expansion${index}`}
              />
              <IconButton
                onClick={(e) => {
                  handleDelete(e, index);
                }}
                children={"Delete"}
                icon={<SmallCloseIcon />}
              />
            </Box>
          </div>
        );
      })}
      <AddButton
        onClick={() =>
          setWorkingExpansionsList(() => {
            const list = [...workingExpansionList];
            list.push("");
            setWorkingExpansionsList(list);
          })
        }
      >
        New/Add Expansion
      </AddButton>
    </div>
  );
}

const AddButton = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: 8px 0;
  color: steelblue;
`;

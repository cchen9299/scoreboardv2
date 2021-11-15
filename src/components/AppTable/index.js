import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function AppTable({ contentMap }) {
  const { headerContent, bodyContent } = contentMap;
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {headerContent.map((cell, index) => {
            return (
              <Th key={index} pl={0}>
                {cell}
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {bodyContent.map((row, index) => {
          return (
            <Tr key={index}>
              {row.map((cell, cellIndex) => {
                return (
                  <Td key={cellIndex} pl={0}>
                    {cell}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
